import React from 'react';
import { Form } from '@unform/web';
import HeaderPanel from '../../components/HeaderPanel';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAuth } from '../../contexts/AuthContext';
import styles from './styles.module.css';

function Profile() {
  const inputFileRef = React.useRef(null);
  const { authUser } = useAuth();

  const [linkImage, setLinkImage] = React.useState(authUser.photo);

  return (
    <div className={styles.container}>
      <HeaderPanel />
      <Form
        initialData={{
          name: authUser.name,
          email: authUser.email,
        }}
      >
        <p>Meu Perfil</p>
        <img
          alt=""
          id="img_profile"
          src={linkImage || 'https://i.ibb.co/dDpxVpV/Group-50.png'}
        />
        <div className={styles.containerButtonsImage}>
          <button
            type="button"
            onClick={() => {
              setLinkImage(null);
            }}
          >
            Remover foto
          </button>
          <button onClick={() => inputFileRef.current.click()} type="button">
            Alterar foto
          </button>
        </div>
        <input
          type="file"
          ref={inputFileRef}
          accept="image/png, image/jpeg"
          onChange={() => {
            const linkImage = URL.createObjectURL(
              inputFileRef.current.files[0]
            );
            setLinkImage(linkImage);
          }}
        />
        <Input type="text" label="Nome" name="name" />
        <Input type="email" label="E-mail" name="email" disabled />
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
