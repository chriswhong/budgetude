import React, { Component } from 'react';
import Card from './Card';


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
    // const { agencyid:routeAgencyid } = this.props.match.params;
    console.log(this.props)


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
