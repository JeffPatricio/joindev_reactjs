/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, {
  forwardRef,
  Fragment,
  useState,
  useImperativeHandle,
  useRef,
  useEffect,
} from 'react';
import Input from '../../Input';
import Select from '../../Select';
import Button from '../../Button';
import { useToast } from '../../../contexts/ToastContext';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import axios from 'axios';
import styles from './styles.module.css';

import ReactMde from 'react-mde';
import * as Showdown from 'showdown';
import 'react-mde/lib/styles/css/react-mde-all.css';
import { useHistory } from 'react-router-dom';

import MDEditor from '@uiw/react-md-editor';

const schema = Yup.object().shape({
  title: Yup.string().required('Campo obrigatório'),
  text: Yup.string().required('Campo obrigatório'),
  tags: Yup.array()
    .of(Yup.number())
    .min(1, 'Necessário escolher ao menos uma tag'),
});

function CreatePostModal({ ...props }, ref) {
  const formRef = useRef(null);
  const buttonRef = useRef(null);
  const tagsRef = useRef({ tags: [] });
  const { showToast } = useToast();
  const [show, setShow] = useState(false);
  const [value, setValue] = React.useState('');
  const [selectedTab, setSelectedTab] = React.useState();
  const history = useHistory();

  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
  });

  useImperativeHandle(
    ref,
    () => {
      return {
        close: () => {
          setShow(false);
          setValue('');
          setSelectedTab('write');
        },
        open: () => setShow(true),
      };
    },
    []
  );

  useEffect(() => {
    axios.get('/colabs/tags').then(({ data }) => {
      if (data.success) {
        tagsRef.current.tags = data.tags;
      }
    });
  }, []);

  async function handleSubmit(data) {
    console.log(data);
    try {
      formRef.current.setErrors({});
      await schema.validate(data, {
        abortEarly: false,
      });

      buttonRef.current.addLoad();

      const dataTags = data.tags.map((tag) => ({ id: tag }));

      axios
        .post('/colabs', { ...data, tags: dataTags })
        .then(({ data }) => {
          const { success, message } = data;
          buttonRef.current.removeLoad();
          if (!success) {
            showToast(message, 'error');
            return;
          }

          showToast(message, 'success');
          setValue('');
          setShow(false);
          history.push({
            pathname: '/main',
            state: {
              reload: true,
            },
          });
        })
        .catch(() => {
          buttonRef.current.removeLoad();
          showToast('Ocorreu um erro ao cadastrar a colab', 'error');
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
          <p>Adicionar postagem</p>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input type="text" label="Título" name="title" autoFocus />
            <Select
              label="Tags"
              multiple
              name="tags"
              options={tagsRef.current.tags}
            />
            <Input hidden value={value} name="text" readOnly />
            <label>Conteúdo</label>
            <ReactMde
              l18n={{ write: 'Escrever', preview: 'Visualizar' }}
              minEditorHeight={400}
              minPreviewHeight={400}
              value={value}
              onChange={setValue}
              selectedTab={selectedTab}
              onTabChange={setSelectedTab}
              generateMarkdownPreview={(markdown) =>
                Promise.resolve(converter.makeHtml(markdown))
              }
            />
            <div className={styles.buttons}>
              <Button ref={buttonRef} type="submit" text="Salvar" />
              <Button
                type="button"
                text="Cancelar"
                onClick={() => setShow(false)}
              />
            </div>

            <MDEditor value={value} onChange={setValue} />
            <MDEditor.Markdown source={value} />
          </Form>
        </div>
      </section>
    </div>
  );
}

export default forwardRef(CreatePostModal);
