
export const fetchDataRange = async(apiUrl) => {
  const response = await fetch(apiUrl);
  const rangeValues = await response.json();
  return rangeValues;
}