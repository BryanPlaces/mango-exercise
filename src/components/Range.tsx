"use client"

import React from 'react';
import { useSlider, useSliderDrag } from '../hooks';
import InputRange from './InputRange';
import './../styles/styles.css'

interface RangeProps {
  initialMin: number;
  initialMax: number;
  step: number;
  useDecimals?: boolean;
}

const Range = ({ initialMin, initialMax, step, useDecimals } : RangeProps) => {

  const {
    sliderRef,
    min,
    max,
    minSlider,
    maxSlider,
    leftSliderPointer,
    rightSliderPointer,
    sliderWidth,
    handleMinChange,
    handleMaxChange,
    handleSliderChange
  } = useSlider({initialMin, initialMax, step, useDecimals});

  const { handleMouseDown } = useSliderDrag(handleSliderChange);


  return (
    <>
      <div className='range-test'>
        <div className='prueba'>

          <InputRange id={ "minInput" } type={ "number" } value={ min } onChange={ handleMinChange } />

          <div ref={sliderRef} className='range-wrapper' onMouseDown={ handleSliderChange } >
            <div className='slider-pointer' style={{ left: `${leftSliderPointer}%` }} onMouseDown={handleMouseDown} ></div>
            <div className='slider' style={{ left: `${leftSliderPointer}%`, width: `${sliderWidth}%` }} ></div>
            <div className='slider-pointer' style={{ left: `${rightSliderPointer}%` }} onMouseDown={handleMouseDown} ></div>
          </div>

          <InputRange id={ "maxInput" } type={ "number" } value={ max } onChange={ handleMaxChange }/>
        </div>
      </div>


      <p style={{ textAlign: 'center', marginTop: '10px' }}>Rango: {minSlider} - {maxSlider}</p>
    </>
  );
};

export default Range;