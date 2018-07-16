import React, { Component } from 'react';
import BarChart from './BarChart';

class Agency extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      name: null,
      children: null,
    };
  }

  componentDidMount() {
    const { apiPath } = this.props;
    this.fetchData(apiPath);
  }

  componentWillReceiveProps(nextProps) {
    const { refreshOn } = this.props;
    const { refreshOn: nextrefreshOn, apiPath } = nextProps;

    if (refreshOn !== nextrefreshOn) this.fetchData(apiPath);
  }

  fetchData(apiPath) {
    fetch(`${process.env.REACT_APP_HOST}${apiPath}`)
      .then(d => d.json())
      .then((data) => {
        const { name, children } = data;

        this.setState({
          name,
          children,
        });
      });
  }

  render() {
    const { name, children } = this.state;
    const {
      linkPrefix,
      title,
      history,
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
      <div>
        <div className="col-md-12 px-0">
          <div className="section-title">
            {title} in {name} {/* eslint-disable-line */}
          </div>
          <BarChart
            data={children}
            history={history}
            linkPrefix={linkPrefix}
          />
        </div>
      </div>
    );
  }
}

export default Agency;
