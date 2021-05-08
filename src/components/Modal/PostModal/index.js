import React from 'react';
import moment from 'moment';
import axios from 'axios';
import Button from '../../Button';
import MarkdownPreview from '@uiw/react-markdown-preview';
import Swal from 'sweetalert2';
import { useToast } from '../../../contexts/ToastContext';
import 'moment/locale/pt-br';
import styles from './styles.module.css';
import { useHistory } from 'react-router-dom';

moment.locale('pt-br');

function Post(
  { viewColab, cleanView, commentColab, withOptions, editColab, ...props },
  ref
) {
  const { showToast } = useToast();
  const buttonRef = React.useRef(null);
  const [show, setShow] = React.useState(false);
  const [comment, setComment] = React.useState('');
  const history = useHistory();

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
    buttonRef.current.addLoad();
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

        const comment = {
          createdAt: data.comment.created_at,
          id: data.comment.id,
          name: data.comment.user.name,
          text: data.comment.text,
        };

        buttonRef.current.removeLoad();
        commentColab(comment);
        showToast(message, 'success');
        setComment('');
      })
      .catch(() => {
        buttonRef.current.removeLoad();
        showToast('Ocorreu um erro ao comentar o colab', 'error');
      });
  }

  if (!show) return <React.Fragment />;

  return (
    <div className={styles.container} {...props} onClick={() => setShow(false)}>
      <section onClick={(e) => e.stopPropagation()}>
        <div>
          {withOptions && (
            <div className={styles.options}>
              <section onClick={() => editColab(viewColab)}>
                <div>
                  <span
                    className="iconify"
                    data-icon="ph:pencil-simple-light"
                    data-inline="false"
                  />
                </div>
                <p>Editar</p>
              </section>
              <section
                onClick={() => {
                  Swal.fire({
                    title: 'Excluir o colab?',
                    text: 'Todos os dados desse colab serão perdidos',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Sim, excluir',
                    confirmButtonColor: '#007bdb',
                    cancelButtonColor: '#888',
                    cancelButtonText: 'Cancelar',
                  }).then((result) => {
                    if (result.value) {
                      axios
                        .delete('/colabs/' + viewColab.id)
                        .then(({ data }) => {
                          if (!data.success) {
                            showToast(data.message, 'error');
                            return;
                          }
                          showToast(data.message, 'success');
                          setShow(false);
                          history.push({
                            pathname: '/main/mycolabs',
                            state: {
                              reload: true,
                            },
                          });
                        })
                        .catch((err) => {
                          console.log(err);
                          showToast(
                            'Ocorreu um erro ao excluir o colab',
                            'error'
                          );
                        });
                    }
                  });
                }}
              >
                <div>
                  <span
                    className="iconify"
                    data-icon="ph:trash-light"
                    data-inline="false"
                  />
                </div>
                <p>Excluir</p>
              </section>
            </div>
          )}
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
              onKeyPress={(event) => {
                if (event.key === 'Enter') {
                  handleSubmit();
                }
              }}
            />
            <Button
              ref={buttonRef}
              type="button"
              text="Comentar"
              onClick={handleSubmit}
            />
          </div>

          <section className={styles.comments}>
            {viewColab.comments.map((comment) => (
              <div key={comment.id}>
                <h1>
                  {comment.name}
                  <small>{moment(comment.createdAt).fromNow()}</small>
                </h1>
                <p>{comment.text}</p>
              </div>
            ))}
          </section>
        </div>
      </section>
    </div>
  );
}

export default React.forwardRef(Post);
