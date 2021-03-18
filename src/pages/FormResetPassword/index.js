import React, { useRef } from 'react';
import HeaderLandingPage from '../../components/HeaderLandingPage';
import ilustration from '../../assets/ilustration.svg';
import styles from './styles.module.css';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import axios from 'axios';
import { useToast } from '../../contexts/ToastContext';
import { useAuth } from '../../contexts/AuthContext';
import Input from '../../components/Input';
import Button from '../../components/Button';

const schema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'A senha deve conter no mínimo 6 caracteres')
    .required('Campo obrigatório'),
  repeatPassword: Yup.string()
    .required('Campo obrigatório')
    .test(
      'passwords-match',
      'As senhas inseridas devem ser iguais',
      function validate(value) {
        return this.parent.password === value;
      }
    ),
});

function FormResetPassword({ match }) {
  const formRef = useRef(null);
  const buttonRef = useRef(null);
  const { showToast } = useToast();
  const { signIn } = useAuth();

  async function handleSubmit(data) {
    try {
      formRef.current.setErrors({});
      await schema.validate(data, {
        abortEarly: false,
      });

      buttonRef.current.addLoad();

      axios
        .put('/resetPassword', { ...data, ...match.params })
        .then(({ data }) => {
          buttonRef.current.removeLoad();
          const { success, message, user } = data;
          if (!success) {
            showToast(message, 'error');
            return;
          }

          showToast(message, 'success');
          signIn(user);
        })
        .catch(() => {
          buttonRef.current.removeLoad();
          showToast('Ocorreu um erro ao alterar a sua senha', 'error');
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
          <h1>Alterar senha</h1>
          <p>
            Crie uma nova senha preenchendo os campos abaixo e clicando em
            Continuar
          </p>
          <Input name="password" type="password" placeholder="Senha" />
          <Input
            name="repeatPassword"
            type="password"
            placeholder="Confirme a senha"
          />
          <Button ref={buttonRef} type="submit" text="Continuar" />
        </Form>
      </main>
    </div>
  );
}

export default FormResetPassword;
