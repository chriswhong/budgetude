import React, { Component } from 'react';
import Card from './Card';


class Agencies extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { agencies: null };
  }

  componentDidMount() {
    fetch(`${process.env.REACT_APP_HOST}/budget`)
      .then(d => d.json())
      .then((data) => {
        this.setState({ agencies: data })
      })
  }

  render() {
    const { agencies } = this.state;
    if (!agencies) return null;


    return (
      <div>
        {agencies.map((agency) => {
          const { agencyname, agencyid, total } = agency;
          const selected = true

          const props = {
            key: agencyid,
            link: `/agency/${agencyid}`,
            title: agencyname,
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

export default Agencies;
