import React from 'react';
import moment from 'moment';
import 'moment/locale/pt-br';
import styles from './styles.module.css';

moment.locale('pt-br');

function Post({ colab }) {
  return (
    <div className={styles.container}>
      <h1>{colab.title}</h1>
      <h2>
        Postado por <strong>{colab.name}</strong>{' '}
        {moment(colab.createdAt, 'YYYYMMDD').locale('pt-br').fromNow()}
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
