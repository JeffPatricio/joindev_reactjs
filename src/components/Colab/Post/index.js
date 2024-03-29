import React from 'react';
import moment from 'moment';
import 'moment/locale/pt-br';
import styles from './styles.module.css';

moment.locale('pt-br');

function Post({ colab, onClick }) {
  return (
    <div className={styles.container} onClick={onClick}>
      <section>
        <img
          alt=""
          id="img_profile"
          src={colab.photo || 'https://i.ibb.co/dDpxVpV/Group-50.png'}
        />
        <div>
          <h1>{colab.title}</h1>
          <p>Postado por {colab.name}</p>
          <section className={styles.tags}>
            {colab.tags.map((tag, index) => (
              <div key={index}>{tag.title}</div>
            ))}
          </section>
        </div>
      </section>
      <section>
        <div className={styles.comments}>
          <span
            className="iconify"
            data-icon="ph:chat-centered-text-thin"
            data-inline="false"
          />
          <p>{colab.comments.length} comentarios</p>
        </div>
        <p>{moment(colab.createdAt).fromNow()}</p>
      </section>
    </div>
  );
}

export default Post;
