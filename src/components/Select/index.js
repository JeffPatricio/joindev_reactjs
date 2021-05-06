/* eslint-disable no-extra-boolean-cast */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-plusplus */
import React, { useEffect, useRef, Fragment } from 'react';
import { useField } from '@unform/core';

const SelectUnform = ({ name, options = [], label, ...rest }) => {
  const inputRef = useRef(null);
  const {
    fieldName,
    defaultValue = rest.multiple ? [] : '',
    registerField,
    error,
  } = useField(name);
  const [v, setV] = React.useState(defaultValue || '');

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      getValue: (ref) => {
        if (!rest.multiple) {
          return ref.value;
        }

        const result = [];
        const options = ref && ref.options;

        for (let i = 0; i < options.length; i++) {
          if (options[i].selected) {
            result.push(options[i].value);
          }
        }
        return result;
      },
    });
  }, [fieldName, registerField, rest]);

  return (
    <Fragment>
      {!!label && <label>{label}</label>}
      <select
        errored={error || error === '' ? 'true' : ''}
        {...rest}
        ref={inputRef}
        graycolor={v === '' ? 'true' : ''}
        defaultValue={defaultValue}
        onChange={(e) => {
          setV(e.currentTarget.value);
          if (!!rest.onChange) {
            rest.onChange(e);
          }
        }}
      >
        {!!rest.placeholder && (
          <option value="">{rest.placeholder || ''}</option>
        )}
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {!!error && <span>{error}</span>}
    </Fragment>
  );
};

export default SelectUnform;
