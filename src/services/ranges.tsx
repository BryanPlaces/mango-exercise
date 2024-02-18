
export const fetchIntegerRange = async() => {
  const response = await fetch(`http://demo6173768.mockable.io/range-values`);
  const rangeValues = await response.json();
  return rangeValues;
}