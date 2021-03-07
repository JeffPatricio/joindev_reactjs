import React from 'react';
import HeaderLandingPage from '../../components/HeaderLandingPage';
import ilustration from '../../assets/ilustration.svg';
import styles from './styles.module.css';

function ForgotPassword() {
  return (
    <div className={styles.container}>
      <HeaderLandingPage />
      <main>
        <div>
          <h1>Conheça a sua nova comunidade colaborativa</h1>
          <img src={ilustration} alt=" " />
        </div>
        <form>
          <h1>Recuperar senha</h1>
          <p>
            Insira abaixo o e-mail utilizado no cadastro para recuperar a sua
            senha
          </p>
          <input type="email" placeholder="E-mail" />
          <button type="submit">Continuar</button>
        </form>
      </main>
    </div>
  );
}

export default ForgotPassword;
