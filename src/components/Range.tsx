"use client"

import React from 'react';
import { useSlider, useSliderDrag } from '../hooks';
import InputRange from './InputRange';
import './../styles/styles.scss'

interface RangeProps {
  initialMin?: number;
  initialMax?: number;
  step?: number;
  useDecimals?: boolean;
  allowedValues?: number[];
}

const Range = ({ initialMin, initialMax, step, useDecimals, allowedValues } : RangeProps) => {

  const {
    sliderRef,
    min,
    max,
    minSelectedRange,
    maxSelectedRange,
    leftStylePointer,
    rightStylePointer,
    rangeStyleWidth,
    handleMinChange,
    handleMaxChange,
    handleRightSliderChange,
    handleLeftSliderChange
  } = useSlider({initialMin, initialMax, step, allowedValues});

  const { handleMouseDown: handleMouseDownRight } = useSliderDrag(handleRightSliderChange);
  const { handleMouseDown: handleMouseDownLeft } = useSliderDrag(handleLeftSliderChange);

  const showInputs = allowedValues && allowedValues.length ? false : true;

  return (
    <>
        <div className='range-container'>

          <InputRange id={"minInput"} type={"number"} onlyLabel={showInputs} value={min} onChange={handleMinChange} useDecimals={useDecimals}/>

          <div ref={sliderRef} className='range-wrapper' >
            <div className='slider-pointer' style={{ left: `${leftStylePointer}%` }} onMouseDown={ handleMouseDownLeft } ></div>
            <div className='slider' style={{ left: `${leftStylePointer}%`, width: `${rangeStyleWidth}%` }} ></div>
            <div className='slider-pointer' style={{ left: `${rightStylePointer}%` }} onMouseDown={ handleMouseDownRight } ></div>
          </div>

          <InputRange id={"maxInput"} type={"number"} onlyLabel={showInputs} value={max} onChange={handleMaxChange} useDecimals={useDecimals}/>
        </div>

      <p style={{ textAlign: 'center', marginTop: '10px' }}>Rango: {minSelectedRange} - {maxSelectedRange}</p>
    </>
  );
};

export default Range;