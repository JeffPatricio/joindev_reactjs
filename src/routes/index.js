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
import ActivateAccount from '../pages/ActivateAccount';
import Colab from '../pages/Colab';
import Events from '../pages/Events';
import Vacancies from '../pages/Vacancies';

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
        <Route exact path="/forgotpassword" component={ForgotPassword} />
        <Route exact path="/activate" component={ActivateAccount} />
        <Route exact path="/colab" component={Colab} />
        <Route exact path="/events" component={Events} />
        <Route exact path="/vacancies" component={Vacancies} />
      </Switch>
    </Router>
  );
};

export default Routes;
