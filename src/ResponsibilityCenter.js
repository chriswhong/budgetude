import React, { Component } from 'react';
import Card from './Card';


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
    fetch(`${process.env.REACT_APP_HOST}/budget/agency/${agencyid}/uoa/${uoaid}/responsibilitycenter/${responsibilitycenterid}`)
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
      <div>
        {budgetCodes.map((budgetcode) => {
          const { budgetcodename, budgetcodeid, total } = budgetcode;

          const props = {
            key: budgetcodeid,
            link: `/agency/${agencyid}/uoa/${uoaid}/responsibilitycenter/${responsibilitycenterid}/budgetcode/${budgetcodeid}`,
            title: budgetcodename,
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
