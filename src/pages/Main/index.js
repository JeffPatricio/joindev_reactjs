import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import styles from './styles.module.css';
import Menu from '../../components/Menu';
import Colab from '../Colab';
import Jobs from '../Jobs';
import Events from '../Events';
import Profile from '../Profile';
import MyColabs from '../MyColabs';

function Main({ match }) {
  return (
    <div className={styles.container}>
      <Menu />
      <main>
        <Route
          exact
          path={`${match.url}/`}
          component={() => <Redirect to={`${match.url}/colab/1`} />}
        />
        <Route
          exact
          path={`${match.url}/colab`}
          component={() => <Redirect to={`${match.url}/colab/1`} />}
        />
        <Route exact path={`${match.url}/colab/:page`} component={Colab} />
        <Route
          exact
          path={`${match.url}/jobs`}
          component={() => <Redirect to={`${match.url}/jobs/1`} />}
        />
        <Route exact path={`${match.url}/jobs/:page`} component={Jobs} />
        <Route
          exact
          path={`${match.url}/events`}
          component={() => <Redirect to={`${match.url}/events/1`} />}
        />
        <Route exact path={`${match.url}/events/:page`} component={Events} />
        <Route exact path={`${match.url}/profile`} component={Profile} />

        <Route exact path={`${match.url}/mycolabs`} component={MyColabs} />
        <Route
          exact
          path={`${match.url}/mycolabs`}
          component={() => <Redirect to={`${match.url}/mycolabs/1`} />}
        />
        <Route
          exact
          path={`${match.url}/mycolabs/:page`}
          component={MyColabs}
        />
      </main>
    </div>
  );
}

export default Main;
