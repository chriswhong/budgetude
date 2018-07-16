import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import numeral from 'numeral';

class Home extends Component {
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
    this.fetchData();
  }

  fetchData() {
    fetch(`${process.env.REACT_APP_HOST}/budget`)
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
    const {
      name,
      children,
      total,
    } = this.state;

    if (name === null) return null;

    const agencyList = children.map((agency) => {
      const {name, id, total} = agency;
      return (
        <div className="agency-link">
          <Link to={`/agency/${id}`} key={id}>
            {name} - {numeral(total).format('$0.0a').toUpperCase()}
          </Link>
        </div>
      )
    });

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h3 className="text-center">NYC's FY 2019 Operating Budget is</h3>
            <div className="big-number">{numeral(total).format('$0.0a').toUpperCase()}</div>
            <h4 className="text-center">Pick an Agency from the list to explore its budget</h4>
            {agencyList}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
