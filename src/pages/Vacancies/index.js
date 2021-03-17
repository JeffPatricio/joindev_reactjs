import React from 'react';
import styles from './styles.module.css';
import Menu from '../../components/Menu';
import HeaderPanel from '../../components/HeaderPanel';
import Search from '../../components/Vacancies/Search';
import CardVacancies from '../../components/Vacancies/CardVacancies';

function Vacancies() {
  return (
    <div className={styles.container}>
      <Menu />
      <div className={styles.panelVacancies}>
        <HeaderPanel />
        <div className={styles.contentPanel}>
          <Search />

          <div className={styles.suggestedVacancies}>
            <h3>Eventos Sugeridos</h3>
            <div className={styles.gridVacancies}>
              <CardVacancies />
              <CardVacancies />
              <CardVacancies />
              <CardVacancies />
            </div>
          </div>

          <div className={styles.suggestedVacancies}>
            <h3>Todos oa vagas</h3>
            <div className={styles.gridVacancies}>
              <CardVacancies />
              <CardVacancies />
              <CardVacancies />
              <CardVacancies />
            </div>
          </div>
        </div>
      </div>
      <div />
    </div>
  );
}

export default Vacancies;
