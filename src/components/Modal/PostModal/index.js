import React from 'react';
import moment from 'moment';
import axios from 'axios';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { useToast } from '../../../contexts/ToastContext';
import 'moment/locale/pt-br';
import styles from './styles.module.css';

moment.locale('pt-br');

function Post({ viewColab, cleanView, ...props }, ref) {
  const { showToast } = useToast();
  const [show, setShow] = React.useState(false);
  const [comment, setComment] = React.useState('');

  React.useImperativeHandle(
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
    if (!show && !!viewColab) cleanView();
  }, [show]);

  async function handleSubmit() {
    if (!comment) return;
    axios
      .post('/colabs/comments', {
        text: comment,
        idColab: viewColab.id,
      })
      .then(({ data }) => {
        const { success, message } = data;
        if (!success) {
          showToast(message, 'error');
          return;
        }

        showToast(message, 'success');
        setComment('');
      })
      .catch(() => {
        showToast('Ocorreu um erro ao comentar a colab', 'error');
      });
  }

  if (!show) return <React.Fragment />;

  return (
    <div className={styles.container} {...props} onClick={() => setShow(false)}>
      <section onClick={(e) => e.stopPropagation()}>
        <div>
          <h1>{viewColab.title}</h1>
          <div className={styles.content}>
            <MarkdownPreview
              source={viewColab.text}
              style={{ color: '#333' }}
            />
          </div>

          <h2>
            Postado por <strong>{viewColab.name} </strong>
            <small>{moment(viewColab.createdAt).fromNow()}.</small>
          </h2>
          <div className={styles.contentAddComments}>
            <input
              id="story"
              name="story"
              placeholder="Adicionar comentário..."
              value={comment}
              onChange={(e) => setComment(e.currentTarget.value)}
            />
            <button type="button" onClick={handleSubmit}>
              Comentar
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default React.forwardRef(Post);
