import React from 'react';
import styles from './styles.module.css';
import avatar2 from '../../../assets/AvatarEvents/avatar2.png';

function EventModal() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.imageCard}>
          <img src={avatar2} alt=" " />
        </div>
        <div className={styles.contentCard}>
          <h1>Lorem Ipsum</h1>
          <h2>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the standard dummy text ever since
            the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only
            five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. Lorem Ipsum is simply dummy text of
            the printing and typesetting industry. Lorem Ipsum has been the
            standard dummy text ever since the 1500s, when an unknown printer
            took a galley of type and scrambled it to make a type specimen book.
            It has survived not only five centuries, but also the leap into
            electronic typesetting, remaining essentially unchanged.
          </h2>

          <h3>
            <strong>Local:</strong> Online
          </h3>
          <h3>
            <strong>Horario:</strong> 08:00 - 18:00
          </h3>
          <h3>
            <strong>Valor:</strong> Gratis
          </h3>
          <h4>Inscrever</h4>
        </div>
      </div>
    </div>
  );
}

export default EventModal;
