import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

const Agency = (props) => {
  const { agencyid } = props.match.params;
  return (
    <div>
      Agency: {agencyid}
    </div>
  );
}

const Home = (props) => (
  <div>
    <h1>Home</h1>
    <div className="container">
      <div className="row">
        <div className="col">
          <ul>
            <li><Link to="/agency/002">Mayoralty</Link></li>
            <li><Link to="/agency/025">Law Department</Link></li>
            <li><Link to="/agency/030">Department of City Planning</Link></li>
          </ul>
        </div>
        <div className="col">
          <Route path="/agency/:agencyid" component={Agency}/>
        </div>
        <div className="col">
          <Route path="/agency/:agencyid/uoa/:uoaid" component={() => (<div>UOA</div>)} />
        </div>
        <div className="col">
          4 of 5
        </div>
        <div className="col">
          5 of 5
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
