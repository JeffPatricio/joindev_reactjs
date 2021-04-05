/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import styles from './styles.module.css';

function Search({ search, setSearch }) {
  const inputSearchRef = React.useRef('');
  return (
    <form
      className={styles.content}
      onSubmit={(event) => {
        event.preventDefault();
        setSearch(inputSearchRef.current.value);
      }}
    >
      <div className={styles.search}>
        {!search && (
          <div>
            <span
              className="iconify"
              data-icon="uil:search"
              data-inline="false"
            />
          </div>
        )}
        {!!search && (
          <div
            className={styles.close}
            onClick={() => {
              setSearch('');
              inputSearchRef.current.value = '';
            }}
          >
            <span
              className="iconify"
              data-icon="ph:x-light"
              data-inline="false"
            />
          </div>
        )}
        <input
          ref={inputSearchRef}
          type="text"
          placeholder="Pesquisar por título ou descrição"
        />
      </div>

      <button
        className={styles.buttonSearch}
        onClick={() => setSearch(inputSearchRef.current.value)}
      >
        <p>Buscar</p>
      </button>
    </form>
  );
}

export default Search;
