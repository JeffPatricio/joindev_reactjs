import React from 'react';
import styles from './styles.module.css';
import moment from 'moment';
import 'moment/locale/pt-br';

moment.locale('pt-br');

function CardEvents({ event }) {
  console.log(event);

  const date = new Date(event.date);
  date.setUTCHours(3);

  return (
    <div className={styles.content}>
      <img src={event.image} alt=" " />
      <div className={styles.contentCard}>
        <h1>{event.title}</h1>
        <h2>{event.details}</h2>
        <div className={styles.bottomCard}>
          <h2>{moment(date).format('DD/MM/YYYY HH:mm:ss')}</h2>
        </div>
      </div>
    </div>
  );
}

export default CardEvents;
