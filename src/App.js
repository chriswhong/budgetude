import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';

import Agencies from './Agencies';
import Agency from './Agency';
import UOA from './UOA';
import ResponsibilityCenter from './ResponsibilityCenter';
import BudgetCode from './BudgetCode';

const Home = (props) => (
  <div>
    <h1>Home</h1>
    <div className="container">
      <div className="row">
        <div className="col">
          <Agencies/>
        </div>
        <div className="col">
          <Route path="/agency/:agencyid" component={Agency}/>
        </div>
        <div className="col">
          <Route path="/agency/:agencyid/uoa/:uoaid" component={UOA} />
        </div>
        <div className="col">
          <Route path="/agency/:agencyid/uoa/:uoaid/responsibilitycenter/:responsibilitycenterid" component={ResponsibilityCenter} />
        </div>
        <div className="col">
          <Route path="/agency/:agencyid/uoa/:uoaid/responsibilitycenter/:responsibilitycenterid/budgetcode/:budgetcodeid" component={BudgetCode} />
        </div>
      </div>
    </div>
  </div>
)

// http://localhost:3000/agency/mayoralty/uoa/002
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
