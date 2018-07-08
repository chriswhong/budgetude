import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import numeral from 'numeral';


class Agency extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { budgetCodes: null };
  }

  componentDidMount() {
    const { responsibilitycenterid } = this.props.match.params;
    this.fetchData(responsibilitycenterid);
  }

  componentWillReceiveProps(nextProps) {
    const { responsibilitycenterid } = this.state;
    const { responsibilitycenterid: nextresponsibilitycenterid } = nextProps.match.params;

    if (responsibilitycenterid !== nextresponsibilitycenterid) this.fetchData(nextresponsibilitycenterid);
  }

  fetchData(responsibilitycenterid) {
    const { agencyid, uoaid } = this.props.match.params;
    fetch(`http://localhost:3000/budget/agency/${agencyid}/uoa/${uoaid}/responsibilitycenter/${responsibilitycenterid}`)
      .then(d => d.json())
      .then((data) => {
        this.setState({
          budgetCodes: data,
          agencyid,
          uoaid,
        })
      })
  }

  render() {
    const { agencyid, uoaid, responsibilitycenterid } = this.props.match.params;
    const { budgetCodes } = this.state;

    if (!budgetCodes) return null;

    return (
      <ul>
        {budgetCodes.map((budgetcode) => {
          const { budgetcodename, budgetcodeid, total } = budgetcode;
          const displayTotal = numeral(total).format('0.0a');
          return (
            <li key={budgetcodeid}>
              <Link to={`/agency/${agencyid}/uoa/${uoaid}/responsibilitycenter/${responsibilitycenterid}/budgetcode/${budgetcodeid}`}>{budgetcodename}</Link>
              ${displayTotal}
            </li>
          );
        })}
      </ul>
    );
  }
}

export default Agency;
