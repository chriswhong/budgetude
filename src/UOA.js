import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import numeral from 'numeral';


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
    fetch(`http://localhost:3000/budget/agency/${agencyid}/uoa/${uoaid}`)
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
      <ul>
        {responsibilityCenters.map((responsibilityCenter) => {
          const { responsibilitycentername, responsibilitycenterid, total } = responsibilityCenter;
          const displayTotal = numeral(total).format('0.0a');
          return (
            <li key={responsibilitycenterid}>
              <Link to={`/agency/${agencyid}/uoa/${uoaid}/responsibilitycenter/${responsibilitycenterid}`}>{responsibilitycentername}</Link>
              ${displayTotal}
            </li>
          );
        })}
      </ul>
    );
  }
}

export default Agency;
