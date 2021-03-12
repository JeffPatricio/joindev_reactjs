import React from 'react';
import styles from './styles.module.css';
import Menu from '../../components/Menu';
import HeaderPanel from '../../components/HeaderPanel';
import Search from '../../components/Events/Search';
import CardEvents from '../../components/Events/CardEvents';

// import CreateEventModal from '../../components/Modal/CreateEventModal';

// import EventModal from '../../components/Modal/EventModal';

function Events() {
  return (
    <div className={styles.container}>
      <Menu />
      <div className={styles.panelColab}>
        {/* A tag CreateEventModal é quando o usuário deseja criar um novo evento.
        <CreateEventModal /> */}

        {/* A tag EventModal é quando o usuário clica para visualizar algum evento.
        <EventModal /> */}
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
