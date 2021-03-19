import React from 'react';
import styles from './styles.module.css';

function Menu() {
  return (
    <div className={styles.container}>
      <label htmlFor="check_menu">
        <span className="iconify" data-icon="ph:list" data-inline="false" />
      </label>
      <button>
        <span className="iconify" data-icon="uil:plus" data-inline="false" />
        <p>Criar Postagem</p>
      </button>
    </div>
  );
}

export default Menu;
