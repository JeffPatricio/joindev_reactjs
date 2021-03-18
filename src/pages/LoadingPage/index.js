/* eslint-disable global-require */
import React from 'react';
import Lottie from 'react-lottie';
import * as animationData from './loading.json';
import styles from './styles.module.css';
import logo from '../../assets/logo_landing.png';

function LoadingPage() {
  return (
    <div className={styles.container}>
      <img src={logo} alt=" " />
      <Lottie
        options={{
          loop: true,
          autoplay: true,
          animationData: animationData.default,
        }}
        height={400}
        width={400}
      />
      <p>Carregando...</p>
    </div>
  );
}

export default LoadingPage;
