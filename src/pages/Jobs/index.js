/* eslint-disable react/no-array-index-key */
import React, { useRef } from 'react';
import HeaderPanel from '../../components/HeaderPanel';
import Button from '../../components/Button';
import styles from './styles.module.css';
import CardVacancies from '../../components/CardVacancies';
import Job from '../../components/Modal/Job';
import CreateJob from '../../components/Modal/CreateJob';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

function Jobs({ match, history }) {
  const { page } = match.params;
  const inputSearchRef = useRef(null);
  const divListRef = useRef(null);
  const formRef = useRef(null);
  const modalViewRef = useRef(null);
  const modalCreateRef = useRef(null);
  const buttonRef = useRef(null);
  const [jobView, setJobView] = React.useState(null);
  const [search, setSearch] = React.useState('');
  const [totalPages, setTotalPages] = React.useState(1);
  const [jobs, setJobs] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log('handle');
  }

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      axios
        .get(`/jobs?page=${page}&search=${search}`)
        .then(({ data }) => {
          console.log(data);
          if (data.success) {
            setJobs(data.jobs);
            setTotalPages(data.totalPages);
            setLoading(false);
          }
        })
        .catch(() => {
          setLoading(false);
        });
    })();
  }, [page, search]);

  return (
    <div className={styles.container}>
      <HeaderPanel />
      <div ref={divListRef}>
        <CreateJob ref={modalCreateRef} />
        <Job ref={modalViewRef} job={jobView} />
        <p>Vagas</p>
        <button onClick={() => modalCreateRef.current.open()}>
          <span
            className="iconify"
            data-icon="ph:plus-light"
            data-inline="false"
          />
          Criar vaga
        </button>
        <form ref={formRef} onSubmit={handleSubmit}>
          <div className={styles.search}>
            {!search && (
              <div>
                <span
                  className="iconify"
                  data-icon="uil:search"
                  data-inline="false"
                />
              </div>
            )}
            {!!search && (
              <div
                className={styles.close}
                onClick={() => {
                  setSearch('');
                  inputSearchRef.current.value = '';
                }}
              >
                <span
                  className="iconify"
                  data-icon="ph:x-light"
                  data-inline="false"
                />
              </div>
            )}
            <input
              type="text"
              ref={inputSearchRef}
              placeholder="Pesquisar por título ou descrição"
            />
          </div>
          <Button
            ref={buttonRef}
            type="submit"
            text="Buscar"
            onClick={() => {
              setSearch(inputSearchRef.current.value);
            }}
          />
        </form>
        {loading && (
          <div className={styles.searchInfo}>
            <p>Carregando</p>
            <p />
          </div>
        )}
        {!loading && !!search && (
          <div className={styles.searchInfo}>
            <p>Resultados da pesquisa</p>
            <p>49 resultados encontrados</p>
          </div>
        )}
        {!loading && !jobs.length && !search && (
          <div className={styles.emptyList}>
            <h4>Não há vagas a serem apresentadas</h4>
          </div>
        )}
        {!loading && !!jobs.length && (
          <div className={styles.containerlist}>
            {jobs.map((job, index) => (
              <CardVacancies
                job={job}
                key={index}
                onClick={() => {
                  setJobView(job);
                  modalViewRef.current.open();
                }}
              />
            ))}
          </div>
        )}
        {!!jobs.length && (
          <ReactPaginate
            previousLabel="<"
            nextLabel=">"
            breakLabel="..."
            pageCount={totalPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={(selectedItem) => {
              divListRef.current.scrollTo(0, 0);
              history.push(`/main/jobs/${selectedItem.selected + 1}`);
            }}
            containerClassName="pagination"
            activeClassName="active"
          />
        )}
      </div>
    </div>
  );
}

export default Jobs;
