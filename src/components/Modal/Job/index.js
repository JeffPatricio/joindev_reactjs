/* eslint-disable no-unused-vars */
import React from 'react';
import styles from './styles.module.css';
import logo from './joindev.svg';
import moment from 'moment';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useToast } from '../../../contexts/ToastContext';
import { useHistory } from 'react-router-dom';

import 'moment/locale/pt-br';

moment.locale('pt-br');

function Job({ viewVacancie, job, withOptions, ...props }, ref) {
  const [show, setShow] = React.useState(false);
  const { showToast } = useToast();
  const history = useHistory();

  React.useImperativeHandle(
    ref,
    () => {
      return {
        close: () => {
          setShow(false);
        },
        open: () => setShow(true),
      };
    },
    []
  );

  React.useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27 && show) {
        setShow(false);
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [show]);

  if (!show) return <React.Fragment />;

  return (
    <div className={styles.container} {...props} onClick={() => setShow(false)}>
      <section onClick={(e) => e.stopPropagation()}>
        <div>
          {withOptions && (
            <div className={styles.options}>
              <section>
                <div>
                  <span
                    className="iconify"
                    data-icon="ph:pencil-simple-light"
                    data-inline="false"
                  />
                </div>
                <p>Editar</p>
              </section>
              <section
                onClick={() => {
                  Swal.fire({
                    title: 'Excluir a vaga?',
                    text: 'Você não poderá mais recuperar os dados dessa vaga',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Sim, excluir',
                    confirmButtonColor: '#007bdb',
                    cancelButtonColor: '#888',
                    cancelButtonText: 'Cancelar',
                  }).then((result) => {
                    if (result.value) {
                      axios
                        .delete('/jobs/' + job.id)
                        .then(({ data }) => {
                          if (!data.success) {
                            showToast(data.message, 'error');
                            return;
                          }
                          showToast(data.message, 'success');
                          setShow(false);
                          history.push({
                            pathname: '/main/myjobs',
                            state: {
                              reload: true,
                            },
                          });
                        })
                        .catch((err) => {
                          console.log(err);
                          showToast(
                            'Ocorreu um erro ao excluir a vaga',
                            'error'
                          );
                        });
                    }
                  });
                }}
              >
                <div>
                  <span
                    className="iconify"
                    data-icon="ph:trash-light"
                    data-inline="false"
                  />
                </div>
                <p>Excluir</p>
              </section>
            </div>
          )}
          <div>
            <img src={logo} alt="" />
            <div>
              <h1>{job.title}</h1>
              <h2>{job.company}</h2>
              <h2>{job.city}</h2>
              <small>Anunciada {moment(job.createdAt).fromNow()}</small>
            </div>
          </div>
          <h3>Detalhes</h3>
          <p style={{ whiteSpace: 'pre-wrap' }}>{job.details}</p>
          <h3>Contato</h3>
          <p>{job.contact}</p>
        </div>
      </section>
    </div>
  );
}

export default React.forwardRef(Job);
