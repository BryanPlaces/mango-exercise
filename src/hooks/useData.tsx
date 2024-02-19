import { useState, useEffect, useCallback } from 'react';
import { fetchDataRange } from '../services/ranges';

const DEFAULT_MIN_VALUE = 1;
const DEFAULT_MAX_VALUE = 100;
const DEFAULT_ALLOWED_VALUES = [1.99, 5.99, 10.99, 30.99, 50.99, 70.99];

export function useMinMaxData(apiUrl: string) {
  const [initialMin, setInitialMin] = useState<number>(0);
  const [initialMax, setInitialMax] = useState<number>(0);

  useEffect(() => {
    getIntegersRange();
  }, []);

  const getIntegersRange = useCallback(async () => {
    try {
      const {min, max} = await fetchDataRange(apiUrl);
      setInitialMin(min);
      setInitialMax(max);
    } catch (error) {
      console.error('Error fetching integer range:', error);
      setInitialMin(DEFAULT_MIN_VALUE);
      setInitialMax(DEFAULT_MAX_VALUE);
    }

  }, []);

  return { initialMin, initialMax }
}

export function useAllowedValues(apiUrl: string) {
  const [allowedValues, setAllowedValues] = useState<number[]>([]);

  useEffect(() => {
    getAllowedValues();
  }, []);

  const getAllowedValues = useCallback(async () => {
    try {
      const elements = await fetchDataRange(apiUrl);
      setAllowedValues(elements);

    } catch (error) {
      console.error('Error fetching integer range:', error);
      setAllowedValues(DEFAULT_ALLOWED_VALUES);
    }

  }, []);

  return { allowedValues }
}