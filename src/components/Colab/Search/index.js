import React from 'react';
import styles from './styles.module.css';

function Search() {
  return (
    <div className={styles.content}>
      <div className={styles.search}>
        <span className="iconify" data-icon="uil:search" data-inline="false" />
        <input type="text" placeholder="Pesquisar por título ou descrição" />
      </div>

      <div className={styles.buttonSearch}>
        <span className="iconify" data-icon="uil:search" data-inline="false" />
        <h1>Pesquisar</h1>
      </div>
    </div>
  );
}

export default Search;
