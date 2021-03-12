import React from 'react';
import styles from './styles.module.css';
import avatar1 from '../../../assets/AvatarEvents/avatar1.png';

function CardEvents() {
  return (
    <div className={styles.content}>
      <div className={styles.avatarCard}>
        <img src={avatar1} alt=" " />
      </div>
      <div className={styles.contentCard}>
        <h1>Lorem Ipsum</h1>
        <h2>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </h2>
        <div className={styles.bottomCard}>
          <h2>Online</h2>
          <h2>20/02/2020</h2>
        </div>
      </div>
    </div>
  );
}

export default CardEvents;
