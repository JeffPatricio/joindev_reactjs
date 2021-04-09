import React from 'react';
import styles from './styles.module.css';
import logo from './joindev.svg';

function Vacancie({ viewVacancie, ...props }, ref) {
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

  if (!show) return <React.Fragment />;

  return (
    <div className={styles.container} {...props} onClick={() => setShow(false)}>
      <section onClick={(e) => e.stopPropagation()}>
        <div>
          <div>
            <img src={logo} alt="" />
            <div>
              <h1>Desenvolvedor Node</h1>
              <h2>Placeholder Sistemas</h2>
              <h2>Goiânia - Goiás</h2>
              <small>Anunciada há 2 semanas</small>
            </div>
          </div>
          <h3>Detalhes</h3>
          <p>
            Experiência comprovada em desenvolvimento Node Experiência
            comprovada em desenvolvimento Node Experiência comprovada em
            desenvolvimento Node Experiência comprovada em desenvolvimento Node
            Experiência comprovada em desenvolvimento Node Experiência
            comprovada em desenvolvimento Node Experiência comprovada em
            desenvolvimento Node Experiência comprovada em desenvolvimento Node
          </p>
          <h3>Contato</h3>
          <p>rh@empresa.com.br</p>
        </div>
      </section>
    </div>
  );
}

export default React.forwardRef(Vacancie);
