import React from 'react';
import styles from './styles.module.css';
import Menu from '../../components/Menu';
import HeaderPanel from '../../components/HeaderPanel';

function Colab() {
  return (
    <div className={styles.container}>
      <main>
        <Menu />
        <HeaderPanel />
        <div />
      </main>
    </div>
  );
}

export default Colab;
