import React from 'react';
import styles from './styles.module.css';
import logojoindev from '../../assets/logojoindev.png';

function CardVacancies({ onClick }) {
  return (
    <div className={styles.content} onClick={onClick}>
      <img src={logojoindev} alt="" />
      <div className={styles.bodyCard}>
        <h1>Analista de Sistemas Sênior</h1>
        <h2>Nome da Empresa</h2>
        <h2>Cidade, Estado</h2>
      </div>
      <div className={styles.bottomCard}>
        <h2>Há 2 semanas</h2>
      </div>
    </div>
  );
}

export default CardVacancies;
