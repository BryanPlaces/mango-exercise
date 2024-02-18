import { useState } from 'react';

export function useInputRange() {
  const [isInputEditing, setIsInputEditing] = useState(false);


  const handleChangeToInput = () => {
    setIsInputEditing(true);
  }

  const handleInputBlur = () => {
    setIsInputEditing(false);
  }

  return {
    isInputEditing,
    handleChangeToInput,
    handleInputBlur
  }
}