import React from 'react';
import styles from './styles.module.css';
import avatar2 from '../../../assets/AvatarEvents/avatar2.png';

function CreateEventModal() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Anunciar Evento</h1>
        <div className={styles.fields}>
          <div className={styles.rowFields}>
            <div className={styles.contentField}>
              <h1>Título</h1>
              <input type="text" placeholder="Ex: Como editar um site" />
            </div>
            <div className={styles.contentField}>
              <h1>Local</h1>
              <input type="text" placeholder="Ex: Online" />
            </div>
          </div>

          <div className={styles.rowFields}>
            <div className={styles.rowsFields}>
              <div className={styles.contentField2}>
                <h1>Horario</h1>
                <input type="text" placeholder="Ex: 08:00 - 18:00" />
              </div>
              <div className={styles.contentField2}>
                <h1>Valor</h1>
                <input type="text" placeholder="Ex: 20,00" />
              </div>
            </div>
            <div className={styles.contentField}>
              <h1>URL do Evento</h1>
              <input type="text" placeholder="Ex: https://www.google.com/" />
            </div>
          </div>

          <div className={styles.rowFields}>
            <div className={styles.contentText}>
              <h1>Descrição</h1>
              <textarea id="story" name="story" rows="16" cols="72" />
            </div>
            <div className={styles.contentImg}>
              <h1>Imagem</h1>
              <div className={styles.imageCard}>
                <img src={avatar2} alt=" " />
              </div>
            </div>
          </div>
          <div className={styles.buttons}>
            <button type="button">Salvar</button>
            <button type="button">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateEventModal;
