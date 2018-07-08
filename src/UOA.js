import React, { Component } from 'react';
import Card from './Card';

class Agency extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { responsibilityCenters: null };
  }

  componentDidMount() {
    const { agencyid, uoaid } = this.props.match.params;
    this.fetchData(agencyid, uoaid);
  }

  componentWillReceiveProps(nextProps) {
    const { agencyid, uoaid } = this.state;
    const { agencyid:nextAgencyid, uoaid:nextUoaid } = nextProps.match.params;

    if ( (agencyid !== nextAgencyid) || (uoaid !== nextUoaid)) this.fetchData(nextAgencyid, nextUoaid);
  }

  fetchData(agencyid, uoaid) {
    fetch(`${process.env.REACT_APP_HOST}/budget/agency/${agencyid}/uoa/${uoaid}`)
      .then(d => d.json())
      .then((data) => {
        this.setState({
          responsibilityCenters: data,
          agencyid,
          uoaid,
        })
      })
  }

  render() {
    const { agencyid, uoaid } = this.props.match.params;
    const { responsibilityCenters } = this.state;

    if (!responsibilityCenters) return null;

    return (
      <div>
        {responsibilityCenters.map((responsibilityCenter) => {
          const { responsibilitycentername, responsibilitycenterid, total } = responsibilityCenter;

          const props = {
            key: responsibilitycenterid,
            link: `/agency/${agencyid}/uoa/${uoaid}/responsibilitycenter/${responsibilitycenterid}`,
            title: responsibilitycentername,
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
