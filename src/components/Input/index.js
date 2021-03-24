import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

export default function Input({ name, label, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: (ref) => {
        if (!!rest && rest.type === 'checkbox') {
          return ref.current.checked;
        }
        return ref.current.value;
      },
      setValue: (ref, value) => {
        ref.current.value = value;
      },
      clearValue: (ref) => {
        ref.current.value = '';
      },
    });
  }, [fieldName, registerField]);

  return (
    <>
      {!!label && <label>{label}</label>}
      <input
        ref={inputRef}
        defaultValue={defaultValue}
        {...rest}
        errored={error ? 'true' : ''}
      />
      {!!error && <span>{error}</span>}
    </>
  );
}
