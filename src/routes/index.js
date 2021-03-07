import React from 'react';
import {
  Switch,
  BrowserRouter as Router,
  Route,
  Redirect,
} from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

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
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
      </Switch>
    </Router>
  );
};

export default Routes;
