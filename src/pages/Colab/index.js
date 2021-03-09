import React from 'react';
import styles from './styles.module.css';
import Menu from '../../components/Menu';

function Colab() {
  return (
    <div className={styles.container}>
      <main>
        <Menu />
      </main>
    </div>
  );
}

export default Colab;
