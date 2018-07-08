import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import numeral from 'numeral';


class BudgetCode extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { objectClasses: null };
  }

  componentDidMount() {
    const { budgetcodeid } = this.props.match.params;
    this.fetchData(budgetcodeid);
  }

  componentWillReceiveProps(nextProps) {
    const { budgetcodeid } = this.state;
    const { budgetcodeid: nextbudgetcodeid } = nextProps.match.params;

    if (budgetcodeid !== nextbudgetcodeid) this.fetchData(nextbudgetcodeid);
  }

  fetchData(budgetcodeid) {
    console.log('fetching')
    const { agencyid, uoaid, responsibilitycenterid } = this.props.match.params;
    fetch(`http://localhost:3000/budget/agency/${agencyid}/uoa/${uoaid}/responsibilitycenter/${responsibilitycenterid}/budgetcode/${budgetcodeid}`)
      .then(d => d.json())
      .then((data) => {
        this.setState({
          objectClasses: data,
          agencyid,
          uoaid,
          responsibilitycenterid,
          budgetcodeid,
        })
      })
  }

  render() {
    const { agencyid, uoaid, responsibilitycenterid, budgetcodeid } = this.props.match.params;
    const { objectClasses } = this.state;

    if (!objectClasses) return null;

    return (
      <ul>
        {objectClasses.map((objectclass) => {
          const { objectclassname, objectclassid, total } = objectclass;
          const displayTotal = numeral(total).format('0.0a');
          return (
            <li key={objectclassid}>
              <Link to={`/agency/${agencyid}/uoa/${uoaid}/responsibilitycenter/${responsibilitycenterid}/budgetcode/${budgetcodeid}/objectclass/${objectclassid}`}>{objectclassname}</Link>
              ${displayTotal}
            </li>
          );
        })}
      </ul>
    );
  }
}

export default BudgetCode;
