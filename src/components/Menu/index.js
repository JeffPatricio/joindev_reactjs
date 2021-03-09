import React from 'react';
import styles from './styles.module.css';
import logo from '../../assets/logo_landing.png';

function Menu() {
  return (
    <header className={styles.container}>
      <div>
        <img src={logo} alt=" " />
      </div>
    </header>
  );
}

export default Menu;
