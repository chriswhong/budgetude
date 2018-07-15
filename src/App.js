import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Agency from './Agency'
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
      <div className="col scroll-column">
        <Route path="/agency/:agencyid" render={() => <Agency
            apiPath={`/budget/agency/${agencyid}`}
            linkPrefix={`/agency/${agencyid}/uoa`}
            activeOn={uoaid}
            refreshOn={agencyid}
            history={props.history}
          />}
        />
        <Route path="/agency/:agencyid/uoa/:uoaid" render={() => <Agency
            apiPath={`/budget/agency/${agencyid}/uoa/${uoaid}`}
            linkPrefix={`/agency/${agencyid}/uoa/${uoaid}/responsibilitycenter`}
            activeOn={responsibilitycenterid}
            refreshOn={uoaid}
            history={props.history}
          />}
        />
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
