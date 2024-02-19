"use client"
import React from 'react';
import Range from '../../components/Range';
import { useAllowedValues } from '../../hooks';

const App = () => {

  const { allowedValues } = useAllowedValues('http://demo6173768.mockable.io/allowed-values');

  return (
    <>
    <div>
      <h2>Range Component by Array of values</h2>
      <Range allowedValues={ allowedValues }/>
    </div>
    </>
  );
};

export default App;