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
    <div className="col scroll-column">
      <Route
        path="/agency/:agencyid"
        render={() => (
          <Agency
            title="Units of Appropriation"
            apiPath={`/budget/agency/${agencyid}`}
            linkPrefix={`/agency/${agencyid}/uoa`}
            activeOn={uoaid}
            refreshOn={agencyid}
            history={props.history}
          />
        )}
      />
      <Route
        path="/agency/:agencyid/uoa/:uoaid"
        render={() => (
          <Agency
            title="Responsibility Centers"
            apiPath={`/budget/agency/${agencyid}/uoa/${uoaid}`}
            linkPrefix={`/agency/${agencyid}/uoa/${uoaid}/responsibilitycenter`}
            activeOn={responsibilitycenterid}
            refreshOn={uoaid}
            history={props.history}
          />
        )}
      />
      <Route
        path="/agency/:agencyid/uoa/:uoaid/responsibilitycenter/:responsibilitycenterid"
        render={() => (
          <Agency
            title="Budget Codes"
            apiPath={`/budget/agency/${agencyid}/uoa/${uoaid}/responsibilitycenter/${responsibilitycenterid}`}
            linkPrefix={`/agency/${agencyid}/uoa/${uoaid}/responsibilitycenter/${responsibilitycenterid}/budgetcode`}
            activeOn={budgetcodeid}
            refreshOn={responsibilitycenterid}
            history={props.history}
          />
        )}
      />
      <Route
        path="/agency/:agencyid/uoa/:uoaid/responsibilitycenter/:responsibilitycenterid/budgetcode/:budgetcodeid"
        render={() => (
          <Agency
            title="Object Classes"
            apiPath={`/budget/agency/${agencyid}/uoa/${uoaid}/responsibilitycenter/${responsibilitycenterid}/budgetcode/${budgetcodeid}`}
            linkPrefix={null}
            activeOn={undefined}
            refreshOn={budgetcodeid}
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
