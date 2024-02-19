"use client"

import React from 'react';
import { useInputRange } from '../hooks';

interface InputRangeProps {
  id: string;
  type: string;
  onlyLabel?: boolean;
  value: number;
  onChange: React.ChangeEventHandler;
  useDecimals?: boolean;
}

const INTEGER_STEP = 1;
const FLOAT_STEP = 0.1;

const InputRange = ({ id, type, onlyLabel, value, onChange, useDecimals } : InputRangeProps) => {

  const {
    isInputEditing,
    handleChangeToInput,
    handleInputBlur,
  } = useInputRange();

  return (
    <>
      {isInputEditing && onlyLabel ?
        <input id={ id } type={ type } value={ value } step={ useDecimals ? FLOAT_STEP : INTEGER_STEP } onChange={ onChange } onBlur={ handleInputBlur } autoFocus/>
      :
        <label className='range-label' onClick={handleChangeToInput}>{ value }</label>
      }
    </>
  );
};

export default InputRange;