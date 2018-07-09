import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import BudgetColumn from './BudgetColumn';

const Home = (props) => {
  //calculate active url params
  const [,, agencyid,, uoaid,, responsibilitycenterid,, budgetcodeid] = props.location.pathname.split('/')

  const activeSegments = {
    agencyid,
    uoaid,
    responsibilitycenterid,
    budgetcodeid,
  }

  console.log('activeSegments', activeSegments)

  return (
    <div>
      <div className="container-fluid">
        <div className="row row-height">
          <div className="col scroll-column">
            <Route path="/" render={() => <BudgetColumn
                activeTitle="Agencies"
                inactiveTitle="Agency"
                apiPath="/budget"
                linkPrefix="/agency"
                activeOn={agencyid}
              />}
            />
          </div>
          <div className="col scroll-column">
            <Route path="/agency/:agencyid" render={() => <BudgetColumn
                activeTitle="Units of Appropriation"
                inactiveTitle="Unit of Appropriation"
                apiPath={`/budget/agency/${agencyid}`}
                linkPrefix={`/agency/${agencyid}/uoa`}
                activeOn={uoaid}
                refreshOn={agencyid}
              />}
            />
          </div>
          <div className="col scroll-column">
            <Route path="/agency/:agencyid/uoa/:uoaid" render={() => <BudgetColumn
                activeTitle="Responsibility Centers"
                inactiveTitle="Responsibility Center"
                apiPath={`/budget/agency/${agencyid}/uoa/${uoaid}`}
                linkPrefix={`/agency/${agencyid}/uoa/${uoaid}/responsibilitycenter`}
                activeOn={responsibilitycenterid}
                refreshOn={uoaid}
              />}
            />
          </div>
          <div className="col scroll-column">
            <Route path="/agency/:agencyid/uoa/:uoaid/responsibilitycenter/:responsibilitycenterid" render={() => <BudgetColumn
                activeTitle="Budget Codes"
                inactiveTitle="Budget Code"
                apiPath={`/budget/agency/${agencyid}/uoa/${uoaid}/responsibilitycenter/${responsibilitycenterid}`}
                linkPrefix={`/agency/${agencyid}/uoa/${uoaid}/responsibilitycenter/${responsibilitycenterid}/budgetcode`}
                activeOn={budgetcodeid}
                refreshOn={responsibilitycenterid}
              />}
            />
          </div>
          <div className="col scroll-column">
            <Route path="/agency/:agencyid/uoa/:uoaid/responsibilitycenter/:responsibilitycenterid/budgetcode/:budgetcodeid" render={() => <BudgetColumn
                activeTitle="Object Classes"
                inactiveTitle="Object Class"
                apiPath={`/budget/agency/${agencyid}/uoa/${uoaid}/responsibilitycenter/${responsibilitycenterid}/budgetcode/${budgetcodeid}`}
                linkPrefix={null}
                activeOn={undefined}
                refreshOn={budgetcodeid}
              />}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const App = () => (
  <Router>
    <Route path="/" component={Home}/>
  </Router>
)

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

export default App;
