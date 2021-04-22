import React from 'react';
import styles from './styles.module.css';
import moment from 'moment';
import 'moment/locale/pt-br';

moment.locale('pt-br');

function Event({ event, ...props }, ref) {
  const [show, setShow] = React.useState(false);

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
