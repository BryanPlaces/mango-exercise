import { useState, useEffect, useRef } from 'react';

export function useSlider({ initialMin, initialMax, step, useDecimals }) {

  const sliderRef = useRef(null);
  const [min, setMin] = useState(initialMin);
  const [max, setMax] = useState(initialMax);

  const [minSlider, setMinSlider] = useState(min);
  const [maxSlider, setMaxSlider] = useState(max);

  const [leftSliderPointer, setLeftSliderPointer] = useState(0);
  const [rightSliderPointer, setRightSliderPointer] = useState(0);
  const [sliderWidth, setSliderWidth] = useState(0);
  const stepValue = step || 1;
  const decimals = useDecimals ? 2 : 0;

  useEffect(() => {
    const leftPointer = ((minSlider - min) / (max - min)) * 100;
    const rightPointer = ((maxSlider - min) / (max - min)) * 100;
    console.log(leftPointer, '--------------')
    setLeftSliderPointer(leftPointer);
    setRightSliderPointer(rightPointer);
    setSliderWidth(rightPointer - leftPointer);

  }, [min, max, minSlider, maxSlider])

  useEffect(() => {
    setMin(initialMin);
    setMax(initialMax);

    setMinSlider(initialMin);
    setMaxSlider(initialMax);
  }, [initialMin, initialMax]);

  const handleMinChange = (e) => {
    const newMin = parseInt(e.target.value, 10);
    const newMax = Math.max(newMin, max);
    updateRangeSlider(newMin, newMax);
  };

  const handleMaxChange = (e) => {
    const newMax = parseInt(e.target.value, 10);
    const newMin = Math.min(newMax, min);
    updateRangeSlider(newMin, newMax);
  };

  const updateRangeSlider = (newMin, newMax) => {
    setMin(newMin);
    setMax(newMax);
    setMinSlider(Math.max(newMin, Math.min(newMax, minSlider)));
    setMaxSlider(Math.min(newMax, Math.max(newMin, maxSlider)));
  }

  const handleSliderChange = (e) => {
    const rect = sliderRef.current.getBoundingClientRect();
    const newValue = ((e.clientX - rect.left) / rect.width) * (max - min) + min;
    const steppedValue = Math.round((newValue - min) / stepValue) * stepValue + min;

    const midpoint = (minSlider + maxSlider) / 2;

    if (newValue <= midpoint) {
      setMinSlider(Math.max(min, Math.min(maxSlider, steppedValue)));
    } else {
      setMaxSlider(Math.min(max, Math.max(minSlider, steppedValue)));
    }
  };

  return {
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
  }
}