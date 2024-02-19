import { useState, useEffect, useRef } from 'react';
import { getNewPointerByStepValue, getNewPointerByArray } from '../helpers/RangePointerPositionHelper';

interface useSliderProps {
  initialMin?: number;
  initialMax?: number;
  step?: number;
  allowedValues?: number[];
}

export function useSlider({ initialMin, initialMax, step, allowedValues }: useSliderProps) {
  const sliderRef = useRef(null);
  const allowedValuesPos = useRef(0);
  const allowedRightValuePos = useRef(allowedValues && allowedValues.length ? allowedValues.length-1 : 0);

  const [min, setMin] = useState(allowedValues && allowedValues.length ? allowedValues[0] : 0);
  const [max, setMax] = useState(allowedValues && allowedValues.length ? allowedValues[allowedValues.length-1] : 0);

  const [minSelectedRange, setMinSelectedRange] = useState(0);
  const [maxSelectedRange, setMaxSelectedRange] = useState(0);

  const [leftStylePointer, setLeftStylePointer] = useState(0);
  const [rightStylePointer, setRightStylePointer] = useState(0);
  const [rangeStyleWidth, setRangeStyleWidth] = useState(0);
  const stepValue = step || 1;

  useEffect(() => {
    const leftPointer = ((minSelectedRange - min) / (max - min)) * 100;
    const rightPointer = ((maxSelectedRange - min) / (max - min)) * 100;
    setLeftStylePointer(leftPointer);
    setRightStylePointer(rightPointer);
    setRangeStyleWidth(rightPointer - leftPointer);

  }, [min, max, minSelectedRange, maxSelectedRange])

  useEffect(() => {

    const newMin = allowedValues && allowedValues.length ? allowedValues[0] : initialMin;
    const newMax = allowedValues && allowedValues.length ? allowedValues[allowedValues.length-1] : initialMax;
    setMin(newMin);
    setMax(newMax);

    setMinSelectedRange(newMin);
    setMaxSelectedRange(newMax);
  }, [initialMin, initialMax, allowedValues]);

  const handleMinChange = (e) => {
    const newMin = parseFloat(e.target.value);
    if (!isNaN(newMin)) {
      const newMax = Math.max(newMin, max);
      if (newMin < newMax) updateRangeSlider(newMin, newMax);
    }
  };

  const handleMaxChange = (e) => {
    const newMax = parseFloat(e.target.value);
    if (!isNaN(newMax)) {
      const newMin = Math.min(newMax, min);
      if (newMax > newMin) updateRangeSlider(newMin, newMax);
    }
  };

  const updateRangeSlider = (newMin, newMax) => {
    setMin(newMin);
    setMax(newMax);
    setMinSelectedRange(Math.max(newMin, Math.min(newMax, minSelectedRange)));
    setMaxSelectedRange(Math.min(newMax, Math.max(newMin, maxSelectedRange)));
  }

  /**
   * This function update the right pointer depending if we are ussing an Array values or the [min, max] range
   * @param e
   */
  const handleRightSliderChange = (e) => {
    const rect = sliderRef.current.getBoundingClientRect();
    const newValue = ((e.clientX - rect.left) / rect.width) * (max - min) + min;

    if (allowedValues && allowedValues.length > 0) {

      const {newPointer, newCurrentPos} = getNewPointerByArray(allowedValues, newValue, allowedRightValuePos.current, maxSelectedRange)
      if (newPointer > minSelectedRange) {
        setMaxSelectedRange(newPointer);
      }
      allowedRightValuePos.current = newCurrentPos;

    } else {

      const newRightPointer = getNewPointerByStepValue(newValue, stepValue, maxSelectedRange);
      if (newRightPointer > minSelectedRange) {
        setMaxSelectedRange(newRightPointer > max ? max : newRightPointer);
      }

    }
  };

  /**
   * This function update the left pointer depending if we are ussing an Array values or the [min, max] range
   * @param e
   */
  const handleLeftSliderChange = (e) => {
    const rect = sliderRef.current.getBoundingClientRect();
    const newValue = ((e.clientX - rect.left) / rect.width) * (max - min) + min;

    if (allowedValues && allowedValues.length > 0) {
      const {newPointer, newCurrentPos} = getNewPointerByArray(allowedValues, newValue, allowedValuesPos.current, minSelectedRange)
      if (newPointer < maxSelectedRange) {
        setMinSelectedRange(newPointer);
      }
      allowedValuesPos.current = newCurrentPos;

    } else {
      const newLeftPointer = getNewPointerByStepValue(newValue, stepValue, minSelectedRange);
      if (newLeftPointer < maxSelectedRange) {
        setMinSelectedRange(newLeftPointer < min ? min : newLeftPointer);
      }
    }
  }

  return {
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
    handleLeftSliderChange,
    handleRightSliderChange
  }
}