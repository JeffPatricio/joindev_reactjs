import React, { useRef } from 'react';
import HeaderLandingPage from '../../components/HeaderLandingPage';
import ilustration from '../../assets/ilustration.svg';
import styles from './styles.module.css';

import * as Yup from 'yup';
import { Form } from '@unform/web';
import axios from 'axios';
import { useToast } from '../../contexts/ToastContext';
import Input from '../../components/Input';
import Button from '../../components/Button';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('O E-mail inserido é inválido')
    .required('Campo obrigatório'),
});

function ForgotPassword({ history }) {
  const formRef = useRef(null);
  const buttonRef = useRef(null);
  const { showToast } = useToast();

  async function handleSubmit(data) {
    try {
      formRef.current.setErrors({});
      await schema.validate(data, {
        abortEarly: false,
      });

      buttonRef.current.addLoad();

      axios
        .post('/resetPassword', data)
        .then(({ data }) => {
          buttonRef.current.removeLoad();
          const { success, message } = data;
          if (!success) {
            showToast(message, 'error');
            return;
          }

          showToast(message, 'success');
          history.push('/');
        })
        .catch(() => {
          buttonRef.current.removeLoad();
          showToast(
            'Ocorreu um erro ao solicitar recuperação de senha',
            'error'
          );
        });
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      }
    }
  }

  return (
    <div className={styles.container}>
      <HeaderLandingPage />
      <main>
        <div>
          <h1>Conheça a sua nova comunidade colaborativa</h1>
          <img src={ilustration} alt=" " />
        </div>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Recuperar senha</h1>
          <p>
            Insira abaixo o e-mail utilizado no cadastro para recuperar a sua
            senha
          </p>
          <Input name="email" type="email" placeholder="E-mail" />
          <Button ref={buttonRef} type="submit" text="Continuar" />
        </Form>
      </main>
    </div>
  );
}

export default ForgotPassword;
