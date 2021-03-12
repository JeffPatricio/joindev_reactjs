import React from 'react';
import styles from './styles.module.css';
import Menu from '../../components/Menu';
import HeaderPanel from '../../components/HeaderPanel';
import Search from '../../components/Events/Search';
import CardEvents from '../../components/Events/CardEvents';

function Events() {
  return (
    <div className={styles.container}>
      <Menu />
      <div className={styles.panelColab}>
        <HeaderPanel />
        <div className={styles.contentPanel}>
          <Search />

          <div className={styles.suggestedEvents}>
            <h3>Eventos Sugeridos</h3>
            <div className={styles.gridEvents}>
              <CardEvents />
              <CardEvents />
              <CardEvents />
            </div>
          </div>

          <div className={styles.suggestedEvents}>
            <h3>Todos os Eventos</h3>
            <div className={styles.gridEvents}>
              <CardEvents />
              <CardEvents />
              <CardEvents />
            </div>
          </div>
        </div>
      </div>
      <div />
    </div>
  );
}

export default Events;
