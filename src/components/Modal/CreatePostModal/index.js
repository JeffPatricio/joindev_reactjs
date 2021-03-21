import React from 'react';
import styles from './styles.module.css';

function CreatePostModal() {
  return (
    <div className={styles.container}>
      <div>
        <h1>Adicionar postagem</h1>
        <div className={styles.rowFields}>
          <div className={styles.contentField}>
            <label>Título</label>
            <input type="text" placeholder="Ex: Como editar um site" />
          </div>
          <div className={styles.contentField}>
            <label>Tipo de postagem</label>
            <input type="text" placeholder="Ex: Como editar um site" />
          </div>
        </div>
        <div className={styles.buttons}>
          <button type="button">Salvar</button>
          <button type="button">Cancelar</button>
        </div>
      </div>
    </div>
  );
}

export default CreatePostModal;
