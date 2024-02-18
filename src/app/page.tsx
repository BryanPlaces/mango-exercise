"use client"
import React from 'react';
import Range from '../components/Range';
import { useRange } from '../hooks/useRange';

const App = () => {

  const { initialMin, initialMax } = useRange();

  return (
    <div>
      <Range initialMin={ initialMin } initialMax={ initialMax } step={ 2 } useDecimals={ true }/>
    </div>
  );
};

export default App;