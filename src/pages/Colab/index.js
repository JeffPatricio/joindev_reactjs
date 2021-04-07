/* eslint-disable no-extra-boolean-cast */
/* eslint-disable react/no-array-index-key */
/* eslint-disable prefer-template */
import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';
import Search from '../../components/Colab/Search';
import Post from '../../components/Colab/Post';
import axios from 'axios';
import HeaderPanel from '../../components/HeaderPanel';
import CreateColabModal from '../../components/Modal/CreateColabModal';
import PostModal from '../../components/Modal/PostModal';
import ReactPaginate from 'react-paginate';

function Colab() {
  const refModalCreate = useRef(null);
  const refModalView = useRef(null);
  const [colabs, setColabs] = useState([]);
  const [search, setSearch] = useState('');
  const [viewColab, setViewColab] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios.get('/colabs?search=' + search + '&page=' + page).then(({ data }) => {
      console.log(data);
      if (data.success) {
        setColabs(data.colabs);
        setTotalPages(data.totalPages);
      }
    });
  }, [search, page]);

  useEffect(() => {
    if (!!viewColab) {
      refModalView.current.open();
    }
  }, [viewColab]);

  return (
    <div className={styles.container}>
      <HeaderPanel />
      <div className={styles.panelColabs}>
        <CreateColabModal ref={refModalCreate} />
        <PostModal viewColab={viewColab} ref={refModalView} />
        <p>Colabs</p>
        <button onClick={() => refModalCreate.current.open()}>
          <span
            className="iconify"
            data-icon="ph:plus-light"
            data-inline="false"
          />
          Criar postagem
        </button>
        <Search setSearch={setSearch} search={search} />
        {!!search && (
          <div className={styles.searchInfo}>
            <p>Resultados da pesquisa</p>
            <p>49 resultados encontrados</p>
          </div>
        )}
        {colabs.map((colab, index) => (
          <Post colab={colab} key={index} onClick={() => setViewColab(colab)} />
        ))}
        <ReactPaginate
          previousLabel="<"
          nextLabel=">"
          breakLabel="..."
          pageCount={totalPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={(selectedItem) => {
            setPage(selectedItem.selected + 1);
          }}
          containerClassName="pagination"
          activeClassName="active"
        />
      </div>
    </div>
  );
}

export default Colab;
