import React, { Component } from 'react';
import Card from './Card';


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
    const { agencyid, uoaid, responsibilitycenterid } = this.props.match.params;
    fetch(`${process.env.REACT_APP_HOST}/budget/agency/${agencyid}/uoa/${uoaid}/responsibilitycenter/${responsibilitycenterid}/budgetcode/${budgetcodeid}`)
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
      <div>
        {objectClasses.map((objectclass) => {
          const { objectclassname, objectclassid, total } = objectclass;

          const props = {
            key: objectclassid,
            link: `/agency/${agencyid}/uoa/${uoaid}/responsibilitycenter/${responsibilitycenterid}/budgetcode/${budgetcodeid}/objectclass/${objectclassid}`,
            title: objectclassname,
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

export default BudgetCode;
