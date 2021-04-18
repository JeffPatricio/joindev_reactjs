/* eslint-disable react/no-array-index-key */
import React, { useRef } from 'react';
import HeaderPanel from '../../components/HeaderPanel';
import Button from '../../components/Button';
import styles from './styles.module.css';
import CardEvent from '../../components/CardEvent';
import Job from '../../components/Modal/Job';
import CreateEvent from '../../components/Modal/CreateEvent';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

function Events({ match, history }) {
  const { page } = match.params;
  const inputSearchRef = useRef(null);
  const divListRef = useRef(null);
  const formRef = useRef(null);
  const modalViewRef = useRef(null);
  const modalCreateRef = useRef(null);
  const buttonRef = useRef(null);
  const [eventView, setEventView] = React.useState(null);
  const [searchCount, setSearchCount] = React.useState('');
  const [search, setSearch] = React.useState('');
  const [totalPages, setTotalPages] = React.useState(1);
  const [events, setEvents] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log('handle');
  }

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      axios
        .get(`/events?page=${page}&search=${search}`)
        .then(({ data }) => {
          if (data.success) {
            console.log(data.events);
            setEvents(data.events);
            setTotalPages(data.totalPages);
            setLoading(false);
            setSearchCount(data.count);
          }
        })
        .catch(() => {
          setLoading(false);
        });
    })();
  }, [search, page]);

  return (
    <div className={styles.container}>
      <HeaderPanel />
      <div ref={divListRef}>
        <CreateEvent ref={modalCreateRef} />
        <Job ref={modalViewRef} job={eventView} />
        <p>Meus Eventos</p>
        <button onClick={() => modalCreateRef.current.open()}>
          <span
            className="iconify"
            data-icon="ph:plus-light"
            data-inline="false"
          />
          Criar evento
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
              history.push(`/main/myevents/1`);
              setSearch(inputSearchRef.current.value);
            }}
          />
        </form>
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
        {!loading && !events.length && !search && (
          <div className={styles.emptyList}>
            <h4>Não há eventos a serem apresentados</h4>
          </div>
        )}
        {!loading && !!events.length && (
          <div className={styles.containerlist}>
            {events.map((event, index) => (
              <CardEvent
                event={event}
                key={index}
                onClick={() => {
                  setEventView(event);
                  modalViewRef.current.open();
                }}
              />
            ))}
          </div>
        )}
        {!!events.length && !loading && (
          <ReactPaginate
            previousLabel="<"
            nextLabel=">"
            breakLabel="..."
            initialPage={page - 1}
            pageCount={totalPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={(selectedItem) => {
              history.push(`/main/myevents/${selectedItem.selected + 1}`);
            }}
            containerClassName="pagination"
            activeClassName="active"
          />
        )}
      </div>
    </div>
  );
}

export default Events;
