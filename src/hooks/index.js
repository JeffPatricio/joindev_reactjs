import React, { Fragment } from 'react';

export default function AppProvider({ children }) {
  return (
    <Fragment>
      {children}
    </Fragment>
  );
}
