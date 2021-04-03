import React, { useRef } from 'react';
import { Form } from '@unform/web';
import HeaderPanel from '../../components/HeaderPanel';
import Input from '../../components/Input';
import Button from '../../components/Button';
import styles from './styles.module.css';

function Vacancies() {
  const formRef = useRef(null);
  const buttonRef = useRef(null);

  async function handleSubmit() {
    console.log('handle');
  }

  return (
    <div className={styles.container}>
      <HeaderPanel />
      <div>
        <p>Vagas</p>
        <button>
          <span
            className="iconify"
            data-icon="ph:plus-light"
            data-inline="false"
          />
          Criar postagem
        </button>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input type="email" placeholder="E-mail" name="email" />
          <Input type="password" placeholder="Senha" name="password" />
          <Button ref={buttonRef} type="submit" text="Entrar" />
        </Form>
      </div>
    </div>
  );
}

export default Vacancies;
