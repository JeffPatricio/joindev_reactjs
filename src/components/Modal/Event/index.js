import React from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/pt-br';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useToast } from '../../../contexts/ToastContext';
import styles from './styles.module.css';

moment.locale('pt-br');

function Event({ event, withOptions, editEvent, ...props }, ref) {
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

  const date = new Date(event.date);
  date.setUTCHours(3);

  return (
    <div className={styles.container} {...props} onClick={() => setShow(false)}>
      <section onClick={(e) => e.stopPropagation()}>
        <div>
          <img src={event.image} alt=" " />
          <section>
            {withOptions && (
              <div className={styles.options}>
                <section onClick={() => editEvent(event)}>
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
                      title: 'Excluir o evento?',
                      text:
                        'Você não poderá mais recuperar os dados desse evento',
                      icon: 'warning',
                      showCancelButton: true,
                      confirmButtonText: 'Sim, excluir',
                      confirmButtonColor: '#007bdb',
                      cancelButtonColor: '#888',
                      cancelButtonText: 'Cancelar',
                    }).then((result) => {
                      if (result.value) {
                        axios
                          .delete('/events/' + event.id)
                          .then(({ data }) => {
                            if (!data.success) {
                              showToast(data.message, 'error');
                              return;
                            }
                            showToast(data.message, 'success');
                            setShow(false);
                            history.push({
                              pathname: '/main/myevents',
                              state: {
                                reload: true,
                              },
                            });
                          })
                          .catch((err) => {
                            console.log(err);
                            showToast(
                              'Ocorreu um erro ao excluir o evento',
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
            <h1>{event.title}</h1>
            <p>{event.details}</p>
            <ul>
              <li>
                Endereço: <small>{event.address}</small>
              </li>
              <li>
                Data:{' '}
                <small>{moment(date).format('DD/MM/YYYY HH:mm:ss')}</small>
              </li>
              <li>
                URL: <small>{event.url}</small>
              </li>
            </ul>
          </section>
        </div>
      </section>
    </div>
  );
}

export default React.forwardRef(Event);
