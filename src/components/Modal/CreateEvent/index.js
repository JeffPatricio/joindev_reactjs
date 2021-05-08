import React, {
  forwardRef,
  Fragment,
  useState,
  useImperativeHandle,
  useRef,
  useEffect,
} from 'react';
import Input from '../../Input';
import Textarea from '../../Textarea';
import Button from '../../Button';
import { useToast } from '../../../contexts/ToastContext';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';
import styles from './styles.module.css';

const schema = Yup.object().shape({
  title: Yup.string().required(''),
  address: Yup.string().required(''),
  date: Yup.date().required('').typeError('Data inválida'),
  url: Yup.string(),
  details: Yup.string().required(''),
  image: Yup.string().required(''),
});

function CreateEvent({ eventEdit, cleanEdit }, ref) {
  const formRef = useRef(null);
  const buttonRef = useRef(null);
  const inputFileRef = useRef(null);
  const { showToast } = useToast();
  const [show, setShow] = useState(false);
  const [filename, setFilename] = useState('');
  const history = useHistory();
  const location = useLocation();

  const initialValues = {
    title: !!eventEdit ? eventEdit.title : '',
    address: !!eventEdit ? eventEdit.address : '',
    date: !!eventEdit ? eventEdit.date.substr(0, 16) : '',
    url: !!eventEdit ? eventEdit.url : '',
    details: !!eventEdit ? eventEdit.details : '',
  };

  useImperativeHandle(
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

  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27 && show) {
        setShow(false);
      }
    };
    if (!!eventEdit) {
      setFilename(eventEdit.image);
    }
    if (!show && !!eventEdit) {
      cleanEdit();
      setFilename('');
    }
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [show]);

  async function handleSubmit(data) {
    try {
      if (data.date === '') delete data.date;
      formRef.current.setErrors({});
      await schema.validate(data, {
        abortEarly: false,
      });

      buttonRef.current.addLoad();

      const form = new FormData();

      form.append('title', data.title);
      form.append('address', data.address);
      form.append('date', data.date);
      form.append('url', data.url);
      form.append('details', data.details);
      if (!!inputFileRef.current.files[0]) {
        form.append('file', inputFileRef.current.files[0]);
      }

      axios
        .put('/events/' + eventEdit.id, form)
        .then(({ data }) => {
          const { success, message } = data;
          buttonRef.current.removeLoad();
          if (!success) {
            showToast(message, 'error');
            return;
          }
          showToast(message, 'success');
          inputFileRef.current.value = [];
          setShow(false);
          history.push({
            pathname:
              location.pathname.indexOf('myevents') > -1
                ? '/main/myevents'
                : '/main/events',
            state: {
              reload: true,
            },
          });
        })
        .catch(() => {
          buttonRef.current.removeLoad();
          showToast('Ocorreu um erro ao atualizar o evento', 'error');
        });
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
        showToast('Necessário preencher os campos destacados', 'error');
      }
    }
  }

  async function handleEdit(data) {
    try {
      if (data.date === '') delete data.date;
      formRef.current.setErrors({});
      await schema.validate(data, {
        abortEarly: false,
      });

      buttonRef.current.addLoad();

      const form = new FormData();

      form.append('title', data.title);
      form.append('address', data.address);
      form.append('date', data.date);
      form.append('url', data.url);
      form.append('details', data.details);
      form.append('file', inputFileRef.current.files[0]);

      axios
        .post('/events', form)
        .then(({ data }) => {
          const { success, message } = data;
          buttonRef.current.removeLoad();
          if (!success) {
            showToast(message, 'error');
            return;
          }
          showToast(message, 'success');
          inputFileRef.current.value = [];
          setShow(false);
          history.push({
            pathname:
              location.pathname.indexOf('myevents') > -1
                ? '/main/myevents'
                : '/main/events',
            state: {
              reload: true,
            },
          });
        })
        .catch(() => {
          buttonRef.current.removeLoad();
          showToast('Ocorreu um erro ao cadastrar o evento', 'error');
        });
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
        showToast('Necessário preencher os campos destacados', 'error');
      }
    }
  }

  if (!show) return <Fragment />;

  return (
    <div className={styles.container} onClick={() => setShow(false)}>
      <section onClick={(e) => e.stopPropagation()}>
        <div onClick={(e) => e.stopPropagation()}>
          <p>{!!eventEdit ? 'Editar evento' : 'Adicionar Evento'}</p>
          <Form
            ref={formRef}
            onSubmit={!!eventEdit ? handleSubmit : handleEdit}
            initialData={initialValues}
          >
            <Input type="text" label="Título *" name="title" autoFocus />
            <Input type="text" label="Endereço *" name="address" />
            <Input
              type="datetime-local"
              label="Data e hora do evento *"
              name="date"
            />
            <Input type="text" label="URL" name="url" />
            <Textarea type="text" label="Detalhes *" name="details" />
            <Input
              type="text"
              label="Imagem *"
              name="image"
              readOnly
              onClick={() => inputFileRef.current.click()}
              value={filename}
            />
            <input
              ref={inputFileRef}
              type="file"
              style={{ display: 'none' }}
              accept="image/png, image/jpeg"
              onChange={() => {
                if (!inputFileRef.current.files[0]) return;
                setFilename(inputFileRef.current.files[0].name);
              }}
            />

            <div className={styles.buttons}>
              <Button ref={buttonRef} type="submit" text="Salvar" />
              <Button
                type="button"
                text="Cancelar"
                onClick={() => setShow(false)}
              />
            </div>
          </Form>
        </div>
      </section>
    </div>
  );
}

export default forwardRef(CreateEvent);
