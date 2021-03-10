import React from 'react';
import styles from './styles.module.css';
import logo from '../../assets/logo_landing.png';

function Menu() {
  return (
    <div className={styles.container}>
      <header>
        <img src={logo} alt=" " />
        <div>
          <span className="iconify" data-icon="uil:plus" data-inline="false" />
          <h1>Criar Postagem</h1>
        </div>
      </header>
    </div>
  );
}

export default Menu;
