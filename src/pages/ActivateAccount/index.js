import React, { useState, useEffect } from 'react';
import HeaderLandingPage from '../../components/HeaderLandingPage';
import styles from './styles.module.css';
import axios from 'axios';
import { useToast } from '../../contexts/ToastContext';

function ActivateAccount({ match }) {
  const { showToast } = useToast();

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    axios
      .post('/users/activate', match.params)
      .then(({ data }) => {
        const { success, message } = data;
        setLoading(false);
        if (!success) {
          showToast(message, 'error');
          setSuccess(false);
          return;
        }
        setSuccess(true);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        showToast('Ocorreu um erro ao ativar a sua conta', 'error');
      });
  }, []);

  return (
    <div className={styles.container}>
      <HeaderLandingPage />
      <main>
        <section>
          {loading && (
            <div lightstyle="true">
              <span
                className="iconify"
                data-icon="ph:timer-light"
                data-inline="false"
              />
              <p>Ativando sua conta... Por favor aguarde</p>
            </div>
          )}
          {!loading && success && (
            <div>
              <span
                className="iconify"
                data-icon="ph:check-circle-light"
                data-inline="false"
              />
              <p>
                Sua conta foi ativada com sucesso!
                <br />
                Faça login para acessar a plataforma.
              </p>
            </div>
          )}
          {!loading && !success && (
            <div errorstyle="true">
              <span
                className="iconify errored"
                data-icon="ph:x-circle-light"
                data-inline="false"
              />
              <p>Ops... Algo deu errado ao ativar a sua conta.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default ActivateAccount;
