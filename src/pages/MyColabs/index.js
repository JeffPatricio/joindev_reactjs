import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';
import Search from '../../components/Colab/Search';
import Post from '../../components/Colab/Post';
import axios from 'axios';
import HeaderPanel from '../../components/HeaderPanel';
import CreateColabModal from '../../components/Modal/CreateColabModal';
import PostModal from '../../components/Modal/PostModal';
import ReactPaginate from 'react-paginate';

function Colab({ history, match }) {
  const { page } = match.params;
  const refModalCreate = useRef(null);
  const refModalView = useRef(null);
  const [colabs, setColabs] = useState([]);
  const [search, setSearch] = useState('');
  const [viewColab, setViewColab] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = React.useState(true);
  const [searchCount, setSearchCount] = React.useState('');

  useEffect(() => {
    setLoading(true);
    axios
      .get('/colabs?search=' + search + '&page=' + page + '&userId=true')
      .then(({ data }) => {
        if (data.success) {
          setColabs(data.colabs);
          setTotalPages(data.totalPages);
          setLoading(false);
          setSearchCount(data.count);
        }
      })
      .catch(() => {
        setLoading(false);
      });
  }, [search, page]);

  useEffect(() => {
    if (!!viewColab) {
      refModalView.current.open();
    }
  }, [viewColab]);

  function commentColab(comment) {
    const old = viewColab;
    old.comments.unshift(comment);
    setViewColab(old);
    axios
      .get('/colabs?search=' + search + '&page=' + page)
      .then(({ data }) => {
        if (data.success) {
          setColabs(data.colabs);
          setTotalPages(data.totalPages);
          setSearchCount(data.count);
        }
      })
      .catch(() => {});
  }

  return (
    <div className={styles.container}>
      <HeaderPanel />
      <div className={styles.panelColabs}>
        <CreateColabModal ref={refModalCreate} />
        <PostModal
          viewColab={viewColab}
          ref={refModalView}
          cleanView={() => setViewColab(null)}
          commentColab={commentColab}
          withOptions
        />
        <p>Meus Colabs</p>
        <button onClick={() => refModalCreate.current.open()}>
          <span
            className="iconify"
            data-icon="ph:plus-light"
            data-inline="false"
          />
          Criar postagem
        </button>
        <Search setSearch={setSearch} search={search} />
        {loading && (
          <div className={styles.searchInfo}>
            <p>Carregando...</p>
            <p />
          </div>
        )}
        {!loading && !!search && (
          <div className={styles.searchInfo}>
            <p>Resultados da pesquisa</p>
            <p>{searchCount} resultados encontrados</p>
          </div>
        )}
        {!loading && !colabs.length && !search && (
          <div className={styles.emptyList}>
            <h4>Não há colabs a serem apresentadas</h4>
          </div>
        )}
        {!loading &&
          !!colabs.length &&
          colabs.map((colab, index) => (
            <Post
              colab={colab}
              key={index}
              onClick={() => setViewColab(colab)}
            />
          ))}
        {!!colabs.length && !loading && (
          <ReactPaginate
            previousLabel="<"
            nextLabel=">"
            breakLabel="..."
            initialPage={page - 1}
            pageCount={totalPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={(selectedItem) => {
              history.push(`/main/mycolabs/${selectedItem.selected + 1}`);
            }}
            containerClassName="pagination"
            activeClassName="active"
          />
        )}
      </div>
    </div>
  );
}

export default Colab;
