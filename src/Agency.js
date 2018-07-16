import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import BudgetRow from './BudgetRow';


class Home extends Component {
  scrollToBottom = () => {
    setTimeout(() => {
      this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }

  render() {
    // calculate active url params
    const { location: { pathname }, history } = this.props;
    const [,, agencyid,, uoaid,, responsibilitycenterid,, budgetcodeid] = pathname.split('/'); // eslint-disable-line

    return (
      <div>
        <Route
          path="/agency/:agencyid"
          render={() => (
            <BudgetRow
              childrenTitle="Units of Appropriation"
              apiPath={`/budget/agency/${agencyid}`}
              linkPrefix={`/agency/${agencyid}/uoa`}
              activeOn={uoaid}
              refreshOn={agencyid}
              entityType="New York City BudgetRow"
              history={history}
              onUpdate={() => this.scrollToBottom()}
            />
          )}
        />
        <Route
          path="/agency/:agencyid/uoa/:uoaid"
          render={() => (
            <BudgetRow
              childrenTitle="Responsibility Centers"
              apiPath={`/budget/agency/${agencyid}/uoa/${uoaid}`}
              linkPrefix={`/agency/${agencyid}/uoa/${uoaid}/responsibilitycenter`}
              activeOn={responsibilitycenterid}
              refreshOn={uoaid}
              entityType="Unit of Appropriation"
              history={history}
              onUpdate={() => this.scrollToBottom()}
            />
          )}
        />
        <Route
          path="/agency/:agencyid/uoa/:uoaid/responsibilitycenter/:responsibilitycenterid"
          render={() => (
            <BudgetRow
              childrenTitle="Budget Codes"
              apiPath={`/budget/agency/${agencyid}/uoa/${uoaid}/responsibilitycenter/${responsibilitycenterid}`}
              linkPrefix={`/agency/${agencyid}/uoa/${uoaid}/responsibilitycenter/${responsibilitycenterid}/budgetcode`}
              activeOn={budgetcodeid}
              refreshOn={responsibilitycenterid}
              entityType="Responsibility Center"
              history={history}
              onUpdate={() => this.scrollToBottom()}
            />
          )}
        />
        <Route
          path="/agency/:agencyid/uoa/:uoaid/responsibilitycenter/:responsibilitycenterid/budgetcode/:budgetcodeid"
          render={() => (
            <BudgetRow
              childrenTitle="Object Classes"
              apiPath={`/budget/agency/${agencyid}/uoa/${uoaid}/responsibilitycenter/${responsibilitycenterid}/budgetcode/${budgetcodeid}`}
              linkPrefix={null}
              activeOn={undefined}
              refreshOn={budgetcodeid}
              entityType="Budget Code"
              history={history}
              onUpdate={() => this.scrollToBottom()}
            />
          )}
        />
        <div style={{ float:"left", clear: "both" }}
             ref={(el) => { this.messagesEnd = el; }}>
        </div>
      </div>
    );
  }
}

export default Home;
