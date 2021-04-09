import React, { useRef } from 'react';
import HeaderPanel from '../../components/HeaderPanel';
import Button from '../../components/Button';
import styles from './styles.module.css';
import CardVacancies from '../../components/CardVacancies';
import Vacancie from '../../components/Modal/Vacancie';
import CreateJob from '../../components/Modal/CreateJob';

function Jobs() {
  const formRef = useRef(null);
  const modalViewRef = useRef(null);
  const modalCreateRef = useRef(null);
  const buttonRef = useRef(null);
  const [search, setSearch] = React.useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    console.log('handle');
  }

  return (
    <div className={styles.container}>
      <HeaderPanel />
      <div>
        <CreateJob ref={modalCreateRef} />
        <Vacancie ref={modalViewRef} />
        <p>Vagas</p>
        <button>
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
              placeholder="Pesquisar por título ou descrição"
              value={search}
              onChange={(e) => setSearch(e.currentTarget.value)}
            />
          </div>
          <Button ref={buttonRef} type="submit" text="Buscar" />
        </form>
        <div className={styles.containerlist}>
          <CardVacancies onClick={() => modalViewRef.current.open()} />
          <CardVacancies />
          <CardVacancies />
          <CardVacancies />
          <CardVacancies />
          <CardVacancies />
          <CardVacancies />
          <CardVacancies />
          <CardVacancies />
          <CardVacancies />
          <CardVacancies />
          <CardVacancies />
          <CardVacancies />
          <CardVacancies />
          <CardVacancies />
        </div>
      </div>
    </div>
  );
}

export default Jobs;
