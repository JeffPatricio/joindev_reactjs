import React, { useState, forwardRef, useImperativeHandle } from 'react';

function Button({ text, ...props }, ref) {
  const [loading, setLoading] = useState(false);

  useImperativeHandle(
    ref,
    () => {
      return {
        addLoad: () => setLoading(true),
        removeLoad: () => setLoading(false),
        toggleLoad: () => setLoading((old) => !old),
        isLoad: loading,
      };
    },
    [loading]
  );

  return (
    <button {...props} disabled={loading}>
      {!loading ? text : 'Carregando...'}
    </button>
  );
}

export default forwardRef(Button);
