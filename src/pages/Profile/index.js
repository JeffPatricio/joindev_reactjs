/* eslint-disable no-extra-boolean-cast */
/* eslint-disable consistent-return */
/* eslint-disable func-names */
import React from 'react';
import { Form } from '@unform/web';
import HeaderPanel from '../../components/HeaderPanel';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import axios from 'axios';

import styles from './styles.module.css';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  name: Yup.string().required('Campo obrigatório'),
  isCompany: Yup.boolean(),
  currentPassword: Yup.string().test(
    'present',
    'A senha atual deve ser maior do que 6 caracteres',
    (val) => {
      if (val.length > 0 && val.length < 6) return false;
      return true;
    }
  ),
  newPassword: Yup.string()
    .when('currentPassword', (currentPassword, schema) => {
      if (currentPassword.length > 0)
        return schema.required('Campo obrigatório');
      return schema;
    })
    .test(
      'passwords-length',
      'A nova senha deve ser maior que 6 caracteres',
      function (value) {
        if (!!this.parent.newPassword) {
          return value.length >= 6;
        }
        return true;
      }
    ),
  confirmNewPassword: Yup.string()
    .when('newPassword', (newPassword, schema) => {
      if (newPassword.length >= 6) {
        return schema.required('Campo obrigatório');
      }
      return schema;
    })
    .oneOf(
      [Yup.ref('newPassword'), null],
      'As senhas inseridas devem ser iguais'
    ),
});

function Profile() {
  const removePhoto = React.useRef({ remove: false });
  const inputFileRef = React.useRef(null);
  const buttonRef = React.useRef(null);
  const { authUser, updateUser } = useAuth();
  const { showToast } = useToast();
  const formRef = React.useRef(null);
  const [linkImage, setLinkImage] = React.useState(authUser.photo);

  async function submitUpdate(dataForm) {
    try {
      formRef.current.setErrors({});
      await schema.validate(dataForm, {
        abortEarly: false,
      });

      buttonRef.current.addLoad();

      const form = new FormData();

      form.append('name', dataForm.name);
      form.append('isCompany', dataForm.isCompany);

      if (removePhoto.current.remove) {
        form.append('removePhoto', 'true');
      }

      if (!!inputFileRef.current.files[0]) {
        console.log('foi');
        form.append('file', inputFileRef.current.files[0]);
      }

      if (!!dataForm.currentPassword) {
        console.log('old');
        form.append('oldPassword', dataForm.currentPassword);
        form.append('newPassword', dataForm.newPassword);
        form.append('confirmNewPassword', dataForm.confirmNewPassword);
      }

      axios
        .put('/users', form)
        .then(({ data }) => {
          console.log(data);
          buttonRef.current.removeLoad();
          const { success, message, user } = data;
          if (!success) {
            showToast(message, 'error');
            return;
          }

          const updated = {
            name: user.name,
            isCompany: user.isCompany,
            photo: user.photo,
          };

          removePhoto.current.remove = false;
          inputFileRef.current.value = [];

          showToast(message, 'success');
          updateUser(updated);
        })
        .catch(() => {
          buttonRef.current.removeLoad();
          showToast('Ocorreu um erro ao atualizar o perfil', 'error');
        });
    } catch (err) {
      buttonRef.current.removeLoad();
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
      <HeaderPanel />
      <Form
        ref={formRef}
        initialData={{
          name: authUser.name,
          email: authUser.email,
          isCompany: authUser.isCompany,
        }}
        onSubmit={submitUpdate}
      >
        <p>Meu Perfil</p>
        <img
          alt=""
          id="img_profile"
          src={linkImage || 'https://i.ibb.co/dDpxVpV/Group-50.png'}
        />
        <div className={styles.containerButtonsImage}>
          {!!linkImage && (
            <button
              className={styles.buttonDelete}
              type="button"
              onClick={() => {
                if (!linkImage) return;
                setLinkImage(null);
                removePhoto.current.remove = true;
              }}
            >
              Remover foto
            </button>
          )}
          <button
            className={styles.buttonUpdate}
            onClick={() => inputFileRef.current.click()}
            type="button"
          >
            {!!linkImage ? 'Alterar foto' : 'Adicionar foto'}
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
        <Input type="text" label="Nome *" name="name" />
        <Input type="email" label="E-mail *" name="email" disabled />
        <div className={styles.checkbox}>
          <Input
            name="isCompany"
            type="checkbox"
            id="isCompany"
            defaultChecked={authUser.isCompany}
          />
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
          <Button ref={buttonRef} type="submit" text="Salvar" />
        </div>
      </Form>
    </div>
  );
}

export default Profile;
