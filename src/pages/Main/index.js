import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import styles from './styles.module.css';
import Menu from '../../components/Menu';
import HeaderPanel from '../../components/HeaderPanel';
import Colab from '../Colab';

function Main({ match }) {
  return (
    <div className={styles.container}>
      <HeaderPanel />
      <section>
        <Menu />
        <div>
          <Route
            exact
            path={`${match.url}/`}
            component={() => <Redirect to={`${match.url}/colab`} />}
          />
          <Route exact path={`${match.url}/colab`} component={Colab} />
        </div>
      </section>
    </div>
  );
}

export default Main;
