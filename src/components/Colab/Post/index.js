import React from 'react';
import styles from './styles.module.css';

function Post() {
  return (
    <div className={styles.container}>
      <h1>
        Programação e café ajudam a sociedade a evoluir conforme a demanda
      </h1>
      <h2>
        Postado pode <strong>Marcos Paulo</strong> há 12 horas{' '}
      </h2>
      <div className={styles.comments}>
        <span
          className="iconify"
          data-icon="uil:comment-alt-message"
          data-inline="false"
        />
        <p>12 comentarios</p>
      </div>
    </div>
  );
}

export default Post;
