import React from 'react';
import moment from 'moment';
import 'moment/locale/pt-br';
import styles from './styles.module.css';

moment.locale('pt-br');

function Post({ colab }) {
  return (
    <div className={styles.container}>
      <section>
        <img
          alt=""
          id="img_profile"
          src="https://images.unsplash.com/photo-1614788620367-6180c4122c82?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
        />
        <div>
          <h1>{colab.title}</h1>
          <p>
            Programação e Café ajudam a sociedade a evoluir conforme a demanda
            Programação e Café ajudam a sociedade a evoluir conforme a demanda
            Programação e Café ajudam a sociedade a evoluir conforme a demanda
            Programação e Café ajudam a sociedade a evoluir conforme a demanda
            Programação e Café ajudam a sociedade a evoluir conforme a demanda
            Programação e Café ajudam a sociedade a evoluir...
          </p>
        </div>
      </section>
      <section>
        <div className={styles.comments}>
          <span
            className="iconify"
            data-icon="ph:chat-centered-text-thin"
            data-inline="false"
          />
          <p>12 comentarios</p>
        </div>
        <p>há 12 horas</p>
      </section>
    </div>
  );
}

export default Post;
