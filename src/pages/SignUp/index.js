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
  name: Yup.string().required('Campo obrigatório'),
  email: Yup.string()
    .email('O E-mail inserido é inválido')
    .required('Campo obrigatório'),
  password: Yup.string()
    .min(6, 'A senha deve conter no mínimo 6 caracteres')
    .required('Campo obrigatório'),
  confirmPassword: Yup.string()
    .required('Campo obrigatório')
    .test(
      'passwords-match',
      'As senhas inseridas devem ser iguais',
      function validate(value) {
        return this.parent.password === value;
      }
    ),
  isCompany: Yup.boolean(),
});

function SignUp({ history }) {
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
        .post('/users', data)
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
          showToast('Ocorreu um erro ao criar uma nova conta', 'error');
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
          <h1>Criar conta</h1>
          <Input name="name" type="text" placeholder="Nome" />
          <Input name="email" type="email" placeholder="E-mail" />
          <Input name="password" type="password" placeholder="Senha" />
          <Input
            name="confirmPassword"
            type="password"
            placeholder="Confirme a senha"
          />
          <div>
            <Input name="isCompany" type="checkbox" id="isBusiness" />
            <label htmlFor="isBusiness">Sou uma empresa</label>
          </div>
          <Button ref={buttonRef} type="submit" text="Salvar" />
        </Form>
      </main>
    </div>
  );
}

export default SignUp;
