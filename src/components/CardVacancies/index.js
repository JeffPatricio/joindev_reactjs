import React from 'react';
import moment from 'moment';
import styles from './styles.module.css';
import logojoindev from '../../assets/logojoindev.png';

import 'moment/locale/pt-br';

moment.locale('pt-br');

function CardVacancies({ job, onClick }) {
  return (
    <div className={styles.content} onClick={onClick}>
      <img src={logojoindev} alt="" />
      <div className={styles.bodyCard}>
        <h1>{job.title}</h1>
        <h2>{job.company}</h2>
        <h2>{job.city}</h2>
      </div>
      <div className={styles.bottomCard}>
        <h2>{moment(job.createdAt).fromNow()}</h2>
      </div>
    </div>
  );
}

export default CardVacancies;
