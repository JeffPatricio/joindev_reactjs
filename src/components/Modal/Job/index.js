import React from 'react';
import styles from './styles.module.css';
import logo from './joindev.svg';
import moment from 'moment';
import 'moment/locale/pt-br';

moment.locale('pt-br');

function Job({ viewVacancie, job, ...props }, ref) {
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

  return (
    <div className={styles.container} {...props} onClick={() => setShow(false)}>
      <section onClick={(e) => e.stopPropagation()}>
        <div>
          <div>
            <img src={logo} alt="" />
            <div>
              <h1>{job.title}</h1>
              <h2>{job.company}</h2>
              <h2>{job.title}</h2>
              <small>Anunciada {moment(job.createdAt).fromNow()}</small>
            </div>
          </div>
          <h3>Detalhes</h3>
          <p>{job.details}</p>
          <h3>Contato</h3>
          <p>{job.contact}</p>
        </div>
      </section>
    </div>
  );
}

export default React.forwardRef(Job);
