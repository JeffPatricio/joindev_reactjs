/* eslint-disable no-nested-ternary */
/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, {
  forwardRef,
  Fragment,
  useState,
  useImperativeHandle,
  useRef,
} from 'react';
import Input from '../../Input';
import Select from '../../Select';
import Textarea from '../../Textarea';
import Button from '../../Button';
import { useToast } from '../../../contexts/ToastContext';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import axios from 'axios';
import styles from './styles.module.css';

import { useHistory } from 'react-router-dom';

const schema = Yup.object().shape({
  title: Yup.string().required(''),
  company: Yup.string().required(''),
  city: Yup.string().required(''),
  state: Yup.string().required(''),
  contact: Yup.string().required(''),
  details: Yup.string().required(''),
});

function CreateJob({ ...props }, ref) {
  const formRef = useRef(null);
  const buttonRef = useRef(null);
  const { showToast } = useToast();
  const [show, setShow] = useState(false);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [state, setState] = useState('');
  const history = useHistory();

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

  React.useEffect(() => {
    axios
      .get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then(({ data }) => {
        const ordened = data.sort((a, b) => {
          return a.nome.toLowerCase() < b.nome.toLowerCase()
            ? -1
            : a.nome.toLowerCase() > b.nome.toLowerCase()
            ? 1
            : 0;
        });
        setStates(ordened);
      })
      .catch(() => {});
  }, []);

  React.useEffect(() => {
    axios
      .get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/distritos`
      )
      .then(({ data }) => {
        const ordened = data.sort((a, b) => {
          return a.nome.toLowerCase() < b.nome.toLowerCase()
            ? -1
            : a.nome.toLowerCase() > b.nome.toLowerCase()
            ? 1
            : 0;
        });
        setCities(ordened);
      })
      .catch(() => {});
  }, [state]);

  React.useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27 && show) {
        setShow(false);
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [show]);

  async function handleSubmit(data) {
    try {
      formRef.current.setErrors({});
      await schema.validate(data, {
        abortEarly: false,
      });

      buttonRef.current.addLoad();

      axios
        .post('/jobs', { ...data, city: `${data.city} - ${data.state}` })
        .then(({ data }) => {
          const { success, message } = data;
          buttonRef.current.removeLoad();
          if (!success) {
            showToast(message, 'error');
            return;
          }
          showToast(message, 'success');
          setShow(false);
          history.push({
            pathname: '/main/jobs',
            state: {
              reload: true,
            },
          });
        })
        .catch(() => {
          buttonRef.current.removeLoad();
          showToast('Ocorreu um erro ao cadastrar a vaga', 'error');
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
    <div className={styles.container} {...props} onClick={() => setShow(false)}>
      <section onClick={(e) => e.stopPropagation()}>
        <div onClick={(e) => e.stopPropagation()}>
          <p>Adicionar Vaga</p>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input type="text" label="Título" name="title" autoFocus />
            <Input type="text" label="Empresa" name="company" />
            <Select
              graycolor={state === '' ? 'true' : ''}
              label="Estado"
              name="state"
              options={states.map((state) => ({
                value: state.sigla,
                label: state.nome,
              }))}
              onChange={(e) => setState(e.currentTarget.value)}
            />
            <Select
              disabled={state === ''}
              label="Cidade"
              name="city"
              options={cities.map((city) => ({
                value: city.nome,
                label: city.nome,
              }))}
            />
            <Input type="text" label="Contato" name="contact" />
            <Textarea type="text" label="Detalhes" name="details" />

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

export default forwardRef(CreateJob);
