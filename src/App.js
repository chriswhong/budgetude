import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Agency from './Agency';

const Home = (props) => {
  // calculate active url params
  const { location: { pathname } } = props;
  const [,, agencyid,, uoaid,, responsibilitycenterid,, budgetcodeid] = pathname.split('/'); // eslint-disable-line

  return (
    <div>
      <Route
        path="/agency/:agencyid"
        render={() => (
          <Agency
            childrenTitle="Units of Appropriation"
            apiPath={`/budget/agency/${agencyid}`}
            linkPrefix={`/agency/${agencyid}/uoa`}
            activeOn={uoaid}
            refreshOn={agencyid}
            entityType="New York City Agency"
            history={props.history}
          />
        )}
      />
      <Route
        path="/agency/:agencyid/uoa/:uoaid"
        render={() => (
          <Agency
            childrenTitle="Responsibility Centers"
            apiPath={`/budget/agency/${agencyid}/uoa/${uoaid}`}
            linkPrefix={`/agency/${agencyid}/uoa/${uoaid}/responsibilitycenter`}
            activeOn={responsibilitycenterid}
            refreshOn={uoaid}
            entityType="Unit of Appropriation"
            history={props.history}
          />
        )}
      />
      <Route
        path="/agency/:agencyid/uoa/:uoaid/responsibilitycenter/:responsibilitycenterid"
        render={() => (
          <Agency
            childrenTitle="Budget Codes"
            apiPath={`/budget/agency/${agencyid}/uoa/${uoaid}/responsibilitycenter/${responsibilitycenterid}`}
            linkPrefix={`/agency/${agencyid}/uoa/${uoaid}/responsibilitycenter/${responsibilitycenterid}/budgetcode`}
            activeOn={budgetcodeid}
            refreshOn={responsibilitycenterid}
            entityType="Responsibility Center"
            history={props.history}
          />
        )}
      />
      <Route
        path="/agency/:agencyid/uoa/:uoaid/responsibilitycenter/:responsibilitycenterid/budgetcode/:budgetcodeid"
        render={() => (
          <Agency
            childrenTitle="Object Classes"
            apiPath={`/budget/agency/${agencyid}/uoa/${uoaid}/responsibilitycenter/${responsibilitycenterid}/budgetcode/${budgetcodeid}`}
            linkPrefix={null}
            activeOn={undefined}
            refreshOn={budgetcodeid}
            entityType="Budget Code"
            history={props.history}
          />
        )}
      />
    </div>
  );
};

const App = () => (
  <Router>
    <Route path="/" component={Home} />
  </Router>
);

export default App;
