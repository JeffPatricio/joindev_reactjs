import React from 'react';
import HeaderLandingPage from '../../components/HeaderLandingPage';
import ilustration from '../../assets/ilustration.svg';
import styles from './styles.module.css';

function LandingPage() {
  return (
    <div className={styles.container}>
      <HeaderLandingPage />
      <main>
        <h1>Conheça a sua nova comunidade colaborativa</h1>
        <p>
          A plataforma Joindev foi criada para facilitar a comunicação entre
          profissionais e empresas.
        </p>
        <img src={ilustration} alt=" " />
      </main>
    </div>
  );
}

export default LandingPage;
