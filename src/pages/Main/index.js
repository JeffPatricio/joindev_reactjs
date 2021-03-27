import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import styles from './styles.module.css';
import Menu from '../../components/Menu';
import Colab from '../Colab';

function Main({ match }) {
  return (
    <div className={styles.container}>
      <Menu />
      <main>
        <Route
          exact
          path={`${match.url}/`}
          component={() => <Redirect to={`${match.url}/colab`} />}
        />
        <Route exact path={`${match.url}/colab`} component={Colab} />
      </main>
    </div>
  );
}

export default Main;
