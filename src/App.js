import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import About from './About';
import Agency from './Agency';
import Home from './Home';

const App = () => (

  <Router>
    <div>
      <header>
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
          <Link to="/">NYC Budgetude</Link>

          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link to="/">Select an Agency</Link>
            </li>
          </ul>

        </nav>
      </header>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <Route path="/agency/:agencyid" component={Agency} />
    </div>
  </Router>
);

export default App;
