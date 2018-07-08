import React, { Component } from 'react';
import Card from './Card';


class Agency extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { uoas: null };
  }

  componentDidMount() {
    const { agencyid } = this.props.match.params;
    this.fetchData(agencyid);
  }

  componentWillReceiveProps(nextProps) {
    const { agencyid } = this.state;
    const { agencyid:nextAgencyid } = nextProps.match.params;

    if ( agencyid !== nextAgencyid) this.fetchData(nextAgencyid);
  }

  fetchData(agencyid) {
    fetch(`${process.env.REACT_APP_HOST}/budget/agency/${agencyid}`)
      .then(d => d.json())
      .then((data) => {
        this.setState({
          uoas: data,
          agencyid,
        })
      })
  }

  render() {
    const { agencyid } = this.props.match.params;
    const { uoas } = this.state;

    if (!uoas) return null;

    return (
      <div>
        {uoas.map((uoa) => {
          const { uoaname, uoaid, total } = uoa;

          const props = {
            key: uoaid,
            link: `/agency/${agencyid}/uoa/${uoaid}`,
            title: uoaname,
            total,
          }

          return (
            <Card {...props}/>
          );
        })}
      </div>
    );
  }
}

export default Agency;
