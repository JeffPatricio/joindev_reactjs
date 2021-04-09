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
import ForgotPassword from '../pages/ForgotPassword';
import FormResetPassword from '../pages/FormResetPassword';
import ActivateAccount from '../pages/ActivateAccount';
import Events from '../pages/Events';
import Jobs from '../pages/Jobs';
import Main from '../pages/Main';
import PrivateRoute from './PrivateRoute';

const Routes = ({ authUser }) => {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={(props) =>
            authUser.authenticated ? (
              <Redirect to="/main" />
            ) : (
              <LandingPage {...props} />
            )
          }
        />
        <Route
          exact
          path="/signin"
          render={(props) =>
            authUser.authenticated ? (
              <Redirect to="/main" />
            ) : (
              <SignIn {...props} />
            )
          }
        />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/forgotpassword" component={ForgotPassword} />
        <Route
          exact
          path="/resetpassword/:resetToken/:userToken"
          render={(props) =>
            authUser.authenticated ? (
              <Redirect to="/main" />
            ) : (
              <FormResetPassword {...props} />
            )
          }
        />
        <Route exact path="/activate/:userToken" component={ActivateAccount} />

        <PrivateRoute path="/main" authUser={authUser} component={Main} />
        <PrivateRoute
          exact
          path="/events"
          authUser={authUser}
          component={Events}
        />
        <PrivateRoute exact path="/jobs" authUser={authUser} component={Jobs} />
      </Switch>
    </Router>
  );
};

export default Routes;
