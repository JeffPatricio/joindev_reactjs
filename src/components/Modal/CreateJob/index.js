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
        setStates(data);
      })
      .catch(() => {});
  }, []);

  React.useEffect(() => {
    axios
      .get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/distritos`
      )
      .then(({ data }) => {
        setCities(data);
      })
      .catch(() => {});
  }, [state]);

  async function handleSubmit(data) {
    try {
      formRef.current.setErrors({});
      await schema.validate(data, {
        abortEarly: false,
      });

      buttonRef.current.addLoad();

      axios
        .post('/jobs', data)
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
    <div className={styles.container} {...props}>
      <section>
        <div onClick={(e) => e.stopPropagation()}>
          <p>Adicionar Vaga</p>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input type="text" placeholder="Título" name="title" autoFocus />
            <Input type="text" placeholder="Empresa" name="company" />
            <select
              placeholder="Estado"
              name="state"
              onChange={(e) => setState(e.currentTarget.value)}
            >
              <option disabled selected>
                Selecione um estado
              </option>
              {states.map((state) => (
                <option value={state.sigla}>{state.nome}</option>
              ))}
            </select>
            <select placeholder="Cidade" name="city">
              <option disabled selected>
                Selecione uma cidade
              </option>
              {cities.map((city) => (
                <option value={city.nome}>{city.nome}</option>
              ))}
            </select>
            <Input type="text" placeholder="Contato" name="contact" />
            <Textarea type="text" placeholder="Detalhes" name="details" />

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
