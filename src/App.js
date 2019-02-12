import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import HomePage from './components/home/HomePage';
// import LandingPage from './components/onboarding/LandingPage';
import { Switch } from 'react-router-dom';
// import {refreshAuthToken} from '../actions/auth';

export default class App extends React.Component {
  
  render() {
    return (
      <Router>
        <Switch>
          {/* <Route exact path="/" component={LandingPage}></Route> */}
          <Route exact path="/home" component={HomePage}></Route>
        </Switch>
      </Router>
    );
  }
}