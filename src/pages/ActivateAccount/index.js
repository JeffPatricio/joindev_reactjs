import React from 'react';
import HeaderLandingPage from '../../components/HeaderLandingPage';
import styles from './styles.module.css';

function ActivateAccount() {
  return (
    <div className={styles.container}>
      <HeaderLandingPage />
      <main>
        <div>
          <span
            className="iconify"
            data-icon="ph:check-circle-light"
            data-inline="false"
          />
          <p>
            Sua conta foi ativada com sucesso!
            <br />
            Faça login para acessar a plataforma.
          </p>
        </div>
      </main>
    </div>
  );
}

export default ActivateAccount;
