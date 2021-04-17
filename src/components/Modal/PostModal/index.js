/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import styles from './styles.module.css';
// import * as Showdown from 'showdown';
// import ReactMde from 'react-mde';

import MarkdownPreview from '@uiw/react-markdown-preview';

function Post({ viewColab, ...props }, ref) {
  const [show, setShow] = React.useState(false);

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

  if (!show) return <React.Fragment />;

  // const converter = new Showdown.Converter({
  //   tables: true,
  //   simplifiedAutoLink: true,
  //   strikethrough: true,
  //   tasklists: true,
  // });

  return (
    <div className={styles.container} {...props} onClick={() => setShow(false)}>
      <section onClick={(e) => e.stopPropagation()}>
        <div>
          <h1>{viewColab.title}</h1>
          <div className={styles.content}>
            {/* <ReactMde
              l18n={{ write: ' ', preview: ' ' }}
              minEditorHeight={400}
              selectedTab="preview"
              minPreviewHeight={400}
              onTabChange={() => {}}
              generateMarkdownPreview={() =>
                Promise.resolve(converter.makeHtml(viewColab.text))
              }
            /> */}
            <MarkdownPreview
              source={viewColab.text}
              style={{ color: '#333' }}
            />
          </div>

          <h2>
            Postado por <strong>{viewColab.name} </strong>
            <small>há 12 horas.</small>
          </h2>
          <div className={styles.contentAddComments}>
            <input
              id="story"
              name="story"
              placeholder="Adicionar comentário..."
            />
            <button type="button">Comentar</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default React.forwardRef(Post);
