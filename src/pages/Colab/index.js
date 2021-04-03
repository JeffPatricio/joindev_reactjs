import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';
import Search from '../../components/Colab/Search';
import Post from '../../components/Colab/Post';
import axios from 'axios';
import HeaderPanel from '../../components/HeaderPanel';
import CreateColabModal from '../../components/Modal/CreateColabModal';

function Colab() {
  const refModalCreate = useRef(null);
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
      <HeaderPanel />
      <div className={styles.panelColabs}>
        <CreateColabModal ref={refModalCreate} />
        <p>Colabs</p>
        <button onClick={() => refModalCreate.current.open()}>
          <span
            className="iconify"
            data-icon="ph:plus-light"
            data-inline="false"
          />
          Criar postagem
        </button>
        <Search />
        {colabs.map((colab) => (
          <Post colab={colab} />
        ))}
      </div>
    </div>
  );
}

export default Colab;
