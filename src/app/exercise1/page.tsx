"use client"
import React from 'react';
import Range from '../../components/Range';
import { useMinMaxData } from '../../hooks/useData';

const App = () => {

  const { initialMin, initialMax } = useMinMaxData('http://demo6173768.mockable.io/range-values');

  return (
    <>
    <div>
      <h2>Range Component with integers values</h2>
      <Range initialMin={ initialMin } initialMax={ initialMax } step={ 3 }/>
    </div>
    <div>
      <h2>Range Component with float values</h2>
      <Range initialMin={ initialMin } initialMax={ initialMax } step={ 1.5 } useDecimals={ true }/>
    </div>
    </>
  );
};

export default App;