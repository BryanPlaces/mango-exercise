export const getNewPointerByStepValue = (newValue, stepValue, selectedPointer) => {

  let nextStep = selectedPointer + stepValue;
  let previousStep = selectedPointer - stepValue < 0 ? 0 : selectedPointer - stepValue;

  const newPointer = newValue >= nextStep ? nextStep : (newValue <= previousStep ? previousStep : selectedPointer);

  return parseFloat(newPointer.toFixed(2));
}

export const getNewPointerByArray = (arrayValues, newDragAndDropValue, currentPos, selectedPointer) => {

  let newPointer = selectedPointer;
  let newCurrentPos = currentPos;

  const nextArrayValue = arrayValues[newCurrentPos+1 > arrayValues.length-1 ? newCurrentPos : newCurrentPos+1];
  const previousArrayValue = arrayValues[newCurrentPos > 0 ? newCurrentPos-1 : 0];

  if (newDragAndDropValue >= nextArrayValue) {
    newPointer = nextArrayValue;
    newCurrentPos += 1;
  } else if (newDragAndDropValue <= previousArrayValue) {
    newPointer = previousArrayValue;
    newCurrentPos = newCurrentPos > 0 ? newCurrentPos-= 1 : 0;
  }

  return {newPointer, newCurrentPos};
}