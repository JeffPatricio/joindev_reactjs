import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import Input from '../../components/Input';
import HeaderLandingPage from '../../components/HeaderLandingPage';
import ilustration from '../../assets/ilustration.svg';
import styles from './styles.module.css';

const schema = Yup.object().shape({
  email: Yup.string().required('Campo obrigatório'),
  password: Yup.string()
    .min(6, 'A senha deve conter no mínimo 6 caracteres')
    .required('Campo obrigatório'),
});

function SignIn() {
  const formRef = useRef(null);

  async function handleSubmit(data) {
    try {
      formRef.current.setErrors({});
      await schema.validate(data, {
        abortEarly: false,
      });
      console.log(data);
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
          <h1>Login</h1>
          <Input type="email" placeholder="E-mail" name="email" />
          <Input type="password" placeholder="Senha" name="password" />
          <button type="submit">Entrar</button>
          <Link to="/forgotPassword">Esqueci a senha</Link>
        </Form>
      </main>
    </div>
  );
}

export default SignIn;
