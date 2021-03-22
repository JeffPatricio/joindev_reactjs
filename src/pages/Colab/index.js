import React from 'react';
import styles from './styles.module.css';
import Search from '../../components/Colab/Search';
import Post from '../../components/Colab/Post';

function Colab() {
  return (
    <div className={styles.container}>
      <div className={styles.panelColabs}>
        <Search />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  );
}

export default Colab;
