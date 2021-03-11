import React from 'react';
import styles from './styles.module.css';
import imgModal from '../../../assets/imgModal.png';

function Post() {
  return (
    <div className={styles.container}>
      <div>
        <h1>
          Programação e Café ajudam a sociedade a evoluir conforme a demanda
        </h1>
        <h2>
          Postado por <strong>Marcos Paulo</strong> há 12 horas.
        </h2>
        <div className={styles.imageModalPost}>
          <img src={imgModal} alt=" " />
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          vel orci eget odio auctor pretium id in quam. Nam dignissim metus quis
          lacus pellentesque, in lacinia diam ornare. Aenean sed purus tincidunt
          nunc malesuada suscipit vitae et urna. Ut ut felis quis sem
          consectetur interdum. Sed ut venenatis justo. Quisque scelerisque
          aliquet nibh, non lobortis velit tempus vitae. Maecenas sit amet
          lectus urna. Sed non erat at metus vulputate dapibus et sed libero.
          Mauris at turpis imperdiet, mattis sem in, malesuada ex. Morbi id
          porttitor nunc, vel aliquam nulla. Nunc ultrices nec est et mattis.
        </p>
        <div className={styles.contentAddComments}>
          <h2>
            Comentar como <strong>andrefmandrade</strong>{' '}
          </h2>
          <textarea id="story" name="story" rows="5" cols="109" />
          <button type="button">Comentar</button>
        </div>
        <div className={styles.contentComments}>
          <h2>
            Comentar como <strong>andrefmandrade</strong>{' '}
          </h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            vel orci eget odio auctor pretium id in quam. Nam dignissim metus
            quis lacus pellentesque, in lacinia diam ornare. Aenean sed purus
            tincidunt nunc malesuada suscipit vitae et urna. Ut ut felis quis
            sem consectetur interdum. Sed ut venenatis justo.
          </p>
          <h2>Mencionar</h2>
        </div>
      </div>
    </div>
  );
}

export default Post;
