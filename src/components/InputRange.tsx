"use client"

import React from 'react';
import { useInputRange } from '../hooks';

const InputRange = ({ id, type, value, onChange}) => {

  const {
    isInputEditing : isMinInputEditing,
    handleChangeToInput: handleMinChangeToInput,
    handleInputBlur: handleMinInputBlur
  } = useInputRange();

  return (
    <>
      {isMinInputEditing ?
        <input id={ id } type={ type } value={ value } onChange={ onChange } onBlur={ handleMinInputBlur } autoFocus/>
      :
        <label className='range-label' onClick={handleMinChangeToInput}>{ value }</label>
      }
    </>
  );
};

export default InputRange;