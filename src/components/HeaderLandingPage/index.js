import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import logo from '../../assets/logo_landing.png';
import styles from './styles.module.css';

function HeaderLandingPage() {
  const history = useHistory();

  return (
    <header className={styles.container}>
      <input type="checkbox" id="check" />
      <a href="/">
        <img src={logo} alt=" " />
      </a>
      <label htmlFor="check">
        <span className="iconify" data-icon="ph:list" data-inline="false" />
      </label>
      <ul className={styles.menuMobile}>
        <li>
          <NavLink to="/">Início</NavLink>
        </li>
        <li>
          <NavLink to="/signup">Cadastre-se</NavLink>
        </li>
        <li>
          <button type="button" onClick={() => history.push('/signin')}>
            Entrar
          </button>
        </li>
        <label htmlFor="check">
          <span className="iconify" data-icon="ph:list" data-inline="false" />
        </label>
      </ul>
    </header>
  );
}

export default HeaderLandingPage;
