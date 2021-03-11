import React from 'react';
import styles from './styles.module.css';
import Menu from '../../components/Menu';
import HeaderPanel from '../../components/HeaderPanel';
import Search from '../../components/Colab/Search';
import Post from '../../components/Colab/Post';

function Colab() {
  return (
    <div className={styles.container}>
      <Menu />
      <div className={styles.panelColab}>
        <HeaderPanel />
        <div className={styles.contentPanel}>
          <Search />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
        </div>
      </div>
      <div />
    </div>
  );
}

export default Colab;
