import React from 'react';
import HeaderPanel from '../../components/HeaderPanel';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Form } from '@unform/web';
import styles from './styles.module.css';

function Profile() {
  return (
    <div className={styles.container}>
      <HeaderPanel />
      <Form>
        <p>Meu Perfil</p>
        <img
          alt=""
          id="img_profile"
          src="https://i.ibb.co/dDpxVpV/Group-50.png"
        />
        <div className={styles.containerButtonsImage}>
          <button>Remover foto</button>
          <button>Alterar foto</button>
        </div>
        <Input type="text" label="Nome" name="name" />
        <Input type="text" label="E-mail" name="email" disabled />
        <div className={styles.checkbox}>
          <Input name="isCompany" type="checkbox" id="isCompany" />
          <label htmlFor="isCompany">Sou uma empresa</label>
        </div>
        <p className={styles.info}>
          Para alterar sua senha, preencha os campos abaixo
        </p>
        <Input type="password" label="Senha atual" name="currentPassword" />
        <Input type="password" label="Nova senha" name="newPassword" />
        <Input
          type="password"
          label="Confirme a nova senha"
          name="confirmNewPassword"
        />
        <div className={styles.buttons}>
          <Button type="submit" text="Salvar" />
        </div>
      </Form>
    </div>
  );
}

export default Profile;
