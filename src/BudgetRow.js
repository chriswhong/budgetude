import React, { Component } from 'react';
import BarChart from './BarChart';
import numeral from 'numeral';

class Agency extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      name: null,
      children: null,
      total: null,
    };
  }

  componentDidMount() {
    const { apiPath, onUpdate } = this.props;
    this.fetchData(apiPath);
    onUpdate();
  }

  componentWillReceiveProps(nextProps) {
    const { refreshOn } = this.props;
    const { refreshOn: nextrefreshOn, apiPath } = nextProps;

    if (refreshOn !== nextrefreshOn) this.fetchData(apiPath);
  }

  componentDidUpdate() {
    const { onUpdate } = this.props;
    onUpdate();
  }

  fetchData(apiPath) {
    fetch(`${process.env.REACT_APP_HOST}${apiPath}`)
      .then(d => d.json())
      .then((data) => {
        const { name, children, total } = data;

        this.setState({
          name,
          children,
          total,
        });
      });
  }

  render() {
    const { name, children, total } = this.state;
    const {
      linkPrefix,
      childrenTitle,
      history,
      entityType,
    } = this.props;

    if (!children) return null;

    // there are duplicate names that mess up the charts, append a number if a value is duplicated.

    const values = [];
    children.forEach((child, i) => {
      const { name: childName } = child;
      // check if it's in there
      if (values.includes(childName)) {
        // check how many times
        const count = values.filter(d => d === childName).length;
        children[i].name = `${childName} - ${count}`;
      }
      values.push(childName);
    });


    return (
      <div className="budget-section">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <small className="entity-description">
                {entityType}
              </small>
              <h3>
                {name}
              </h3>
              <div className="big-number">
                {numeral(total).format('$0.0a').toUpperCase()}
              </div>
              <div className="big-number-subtitle">
                Fiscal Year 2019 Budget
              </div>
            </div>
            <div className="col-md-8">
              <div><small>
                &zwnj;
              </small></div>
              <div className="section-title">
                {childrenTitle}
              </div>
              <BarChart
                data={children}
                history={history}
                linkPrefix={linkPrefix}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Agency;
