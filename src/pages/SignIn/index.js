import React from 'react';
import { Link } from 'react-router-dom';
import HeaderLandingPage from '../../components/HeaderLandingPage';
import ilustration from '../../assets/ilustration.svg';
import styles from './styles.module.css';

function SignIn() {
  return (
    <div className={styles.container}>
      <HeaderLandingPage />
      <main>
        <div>
          <h1>Conheça a sua nova comunidade colaborativa</h1>
          <img src={ilustration} alt=" " />
        </div>
        <form>
          <h1>Login</h1>
          <input type="email" placeholder="E-mail" />
          <input type="password" placeholder="Senha" />
          <button type="submit">Entrar</button>
          <Link to="/forgotPassword">Esqueci a senha</Link>
        </form>
      </main>
    </div>
  );
}

export default SignIn;
