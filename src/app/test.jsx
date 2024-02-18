import React, { useState, useRef, useEffect } from 'react';

const Slider = ({ initialMin, initialMax }) => {
  const [min, setMin] = useState(initialMin);
  const [max, setMax] = useState(initialMax);
  const [sliderValue1, setSliderValue1] = useState(min);
  const [sliderValue2, setSliderValue2] = useState(max);
  const [isDragging1, setIsDragging1] = useState(false);
  const [isDragging2, setIsDragging2] = useState(false);
  const sliderRef = useRef(null);

  const handleMouseDown1 = () => {
    setIsDragging1(true);
  };

  const handleMouseDown2 = () => {
    setIsDragging2(true);
  };

  const handleMouseUp = () => {
    setIsDragging1(false);
    setIsDragging2(false);
  };

  const handleMouseMove = (e) => {
    if (isDragging1 || isDragging2) {
      const rect = sliderRef.current.getBoundingClientRect();
      const newValue = ((e.clientX - rect.left) / rect.width) * (max - min) + min;

      if (isDragging1) {
        setSliderValue1(Math.max(min, Math.min(sliderValue2, Math.round(newValue))));
      } else if (isDragging2) {
        setSliderValue2(Math.min(max, Math.max(sliderValue1, Math.round(newValue))));
      }
    }
  };

  const handleClick = (e) => {
    const rect = sliderRef.current.getBoundingClientRect();
    const newValue = ((e.clientX - rect.left) / rect.width) * (max - min) + min;

    // Adjust the values of the sliders based on the click position
    const midpoint = (sliderValue1 + sliderValue2) / 2;

    if (newValue <= midpoint) {
      setSliderValue1(Math.max(min, Math.min(sliderValue2, Math.round(newValue))));
    } else {
      setSliderValue2(Math.min(max, Math.max(sliderValue1, Math.round(newValue))));
    }
  };

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isDragging1, isDragging2, handleMouseMove]);

  const handleMinChange = (e) => {
    const newMin = parseInt(e.target.value, 10);
    const newMax = Math.max(newMin, max);
    setMin(newMin);
    setMax(newMax);
    setSliderValue1(Math.max(newMin, Math.min(newMax, sliderValue1)));
    setSliderValue2(Math.min(newMax, Math.max(newMin, sliderValue2)));
  };

  const handleMaxChange = (e) => {
    const newMax = parseInt(e.target.value, 10);
    const newMin = Math.min(newMax, min);
    setMin(newMin);
    setMax(newMax);
    setSliderValue1(Math.max(newMin, Math.min(newMax, sliderValue1)));
    setSliderValue2(Math.min(newMax, Math.max(newMin, sliderValue2)));
  };

  return (
    <div>
      <div
        ref={sliderRef}
        style={{
          position: 'relative',
          width: '100%',
          height: '8px',
          backgroundColor: '#ddd',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
        onMouseDown={handleClick} // Use handleClick instead of handleMouseDown
        onClick={() => {}} // Prevent default onClick behavior
      >
        <div
          style={{
            position: 'absolute',
            width: `${((sliderValue1 - min) / (max - min)) * 100}%`,
            height: '100%',
            backgroundColor: '#3498db',
            borderRadius: '4px',
          }}
        ></div>
        <div
          style={{
            position: 'absolute',
            left: `${((sliderValue1 - min) / (max - min)) * 100}%`,
            transform: 'translateX(-50%)',
            width: '16px',
            height: '16px',
            backgroundColor: '#3498db',
            borderRadius: '50%',
            cursor: 'pointer',
          }}
          onMouseDown={handleMouseDown1}
        ></div>
        <div
          style={{
            position: 'absolute',
            width: `${((sliderValue2 - min) / (max - min)) * 100 - ((sliderValue1 - min) / (max - min)) * 100}%`,
            height: '100%',
            backgroundColor: '#e74c3c',
            borderRadius: '4px',
            left: `${((sliderValue1 - min) / (max - min)) * 100}%`,
          }}
        ></div>
        <div
          style={{
            position: 'absolute',
            left: `${((sliderValue2 - min) / (max - min)) * 100}%`,
            transform: 'translateX(-50%)',
            width: '16px',
            height: '16px',
            backgroundColor: '#e74c3c',
            borderRadius: '50%',
            cursor: 'pointer',
          }}
          onMouseDown={handleMouseDown2}
        ></div>
      </div>
      <p style={{ textAlign: 'center', marginTop: '10px' }}>Rango: {sliderValue1} - {sliderValue2}</p>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <label htmlFor="minInput">Min:</label>
        <input
          type="number"
          id="minInput"
          value={min}
          onChange={handleMinChange}
        />
        <label htmlFor="maxInput">Max:</label>
        <input
          type="number"
          id="maxInput"
          value={max}
          onChange={handleMaxChange}
        />
      </div>
    </div>
  );
};

export default Slider;