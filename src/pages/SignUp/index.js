import React from 'react';
import HeaderLandingPage from '../../components/HeaderLandingPage';
import ilustration from '../../assets/ilustration.svg';
import styles from './styles.module.css';

function SignUp() {
  return (
    <div className={styles.container}>
      <HeaderLandingPage />
      <main>
        <div>
          <h1>Conheça a sua nova comunidade colaborativa</h1>
          <img src={ilustration} alt=" " />
        </div>
        <form>
          <h1>Criar conta</h1>
          <input type="text" placeholder="Nome" />
          <input type="email" placeholder="E-mail" />
          <input type="password" placeholder="Senha" />
          <input type="confirmPassword" placeholder="Confirme a senha" />
          <div>
            <input type="checkbox" id="isBusiness" />
            <label htmlFor="isBusiness">Sou uma empresa</label>
          </div>
          <button type="submit">Salvar</button>
        </form>
      </main>
    </div>
  );
}

export default SignUp;
