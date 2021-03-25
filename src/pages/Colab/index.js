import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import Search from '../../components/Colab/Search';
import Post from '../../components/Colab/Post';
import axios from 'axios';

function Colab() {
  const [colabs, setColabs] = useState([]);

  useEffect(() => {
    axios.get('/colabs/get').then(({ data }) => {
      if (data.success) {
        setColabs(data.colabs);
      }
    });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.panelColabs}>
        <Search />

        {colabs.map((colab) => (
          <Post colab={colab} />
        ))}
      </div>
    </div>
  );
}

export default Colab;
