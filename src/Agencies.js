import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import numeral from 'numeral';


class Agencies extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { agencies: null };
  }

  componentDidMount() {
    fetch('http://localhost:3000/budget')
      .then(d => d.json())
      .then((data) => {
        this.setState({ agencies: data })
      })
  }

  render() {
    const { agencies } = this.state;
    if (!agencies) return null;


    return (
      <ul>
        {agencies.map((agency) => {
          const { agencyname, agencyid, total } = agency;
          const displayTotal = numeral(total).format('0.0a');
          return (
            <li key={agencyid}>
              <Link to={`/agency/${agencyid}`}>{agencyname}</Link>
              ${displayTotal}
            </li>
          );
        })}
      </ul>
    );
  }
}

export default Agencies;
