import React, { Component } from 'react';
import Card from './Card';


class BudgetColumn extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { cards: null };
  }

  componentDidMount() {
    const { apiPath } = this.props;
    this.fetchData(apiPath);
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps', this.props, nextProps)
    const {refreshOn} = this.props;
    const {refreshOn: nextrefreshOn, apiPath} = nextProps;

    if (refreshOn !== nextrefreshOn) this.fetchData(apiPath);
  }

  fetchData(apiPath) {
    fetch(`${process.env.REACT_APP_HOST}${apiPath}`)
      .then(d => d.json())
      .then((data) => {
        this.setState({ cards: data })
      })
  }

  render() {
    const { cards } = this.state;
    const { linkPrefix, activeSegments, title, activeTitle, inactiveTitle, activeOn} = this.props;
    const isActive = (activeOn === undefined);
    if (!cards) return null;


    return (
      <div>
        <h4>{isActive ? activeTitle : inactiveTitle}</h4>
        {cards.map((card) => {
          const { name, id, total } = card;

          let selected;
          if (isActive) {
            selected = null;
          } else {
            selected = (id === activeOn);
          }

          const props = {
            key: id,
            link: linkPrefix ? `${linkPrefix}/${id}` : null,
            title: name,
            total,
            selected,
          }

          return (
            <Card {...props}/>
          );
        })}
      </div>
    );
  }
}

export default BudgetColumn;
