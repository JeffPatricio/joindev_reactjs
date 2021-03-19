import React from 'react';
import styles from './styles.module.css';

function Menu() {
  return (
    <div className={styles.container}>
      <button>
        <span className="iconify" data-icon="uil:plus" data-inline="false" />
        <p>Criar Postagem</p>
      </button>
    </div>
  );
}

export default Menu;
