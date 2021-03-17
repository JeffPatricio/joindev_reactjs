import React from 'react';
import styles from './styles.module.css';

function Search() {
  return (
    <div className={styles.content}>
      <h2>Procure uma vaga</h2>
      <div className={styles.rowSearch}>
        <div className={styles.search}>
          <span
            className="iconify"
            data-icon="uil:search"
            data-inline="false"
          />
          <input type="text" placeholder="Pesquisar por título ou descrição" />
        </div>
        <div className={styles.search}>
          <span
            className="iconify"
            data-icon="uil:location-point"
            data-inline="false"
          />
          <input type="text" placeholder="Pesquisar por cidade" />
        </div>

        <div className={styles.buttonSearch}>
          <span
            className="iconify"
            data-icon="uil:search"
            data-inline="false"
          />
          <h1>Pesquisar</h1>
        </div>
      </div>
    </div>
  );
}

export default Search;
