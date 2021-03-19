import React from 'react';
import styles from './styles.module.css';
import HeaderPanel from '../../components/HeaderPanel';
import Search from '../../components/Colab/Search';
import Post from '../../components/Colab/Post';

// import PostModal from '../../components/Modal/PostModal';

// import CreatePostModal from '../../components/Modal/CreatePostModal';

function Colab() {
  return (
    <div className={styles.container}>
      {/* A tag PostModal é um Card de quando o usuário clica para adicionar um comentario em uma publicação outro usuário.
        <PostModal /> */}

      {/* A tag "CreatePostModal" é um Card quando o usuário clica para criar um novo post
        <CreatePostModal /> */}
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
  );
}

export default Colab;
