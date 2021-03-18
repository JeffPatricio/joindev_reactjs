import React from 'react';
import styles from './styles.module.css';

function CreatePostModal() {
  return (
    <div className={styles.container}>
      <div>
        {/* <span
        class="iconify"
        data-icon="uil:multiply"
        data-inline="false"></span> */}
        <h1>Adicionar postagem</h1>
        <div className={styles.rowFields}>
          <div className={styles.contentField}>
            <h1>Título</h1>
            <input type="text" placeholder="Ex: Como editar um site" />
          </div>
          <div className={styles.contentField}>
            <h1>Tipo de postagem</h1>
            <input type="text" placeholder="Ex: Como editar um site" />
          </div>
        </div>
        <textarea id="story" name="story" rows="20" cols="108" />
        <div className={styles.buttons}>
          <button type="button">Salvar</button>
          <button type="button">Cancelar</button>
        </div>
      </div>
    </div>
  );
}

export default CreatePostModal;
