import React from 'react';
import {
  Switch,
  BrowserRouter as Router,
  Route,
  Redirect,
} from 'react-router-dom';
import LandingPage from '../pages/LandingPage';

const Routes = ({ authUser }) => {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={() =>
            authUser.authenticated ? <Redirect to="/main" /> : <LandingPage />
          }
        />
      </Switch>
    </Router>
  );
};

export default Routes;
