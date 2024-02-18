import { useState, useEffect, useCallback } from 'react';
import { fetchIntegerRange } from '../services/ranges';

export function useRange() {
  const [initialMin, setInitialMin] = useState(0);
  const [initialMax, setInitialMax] = useState(0);

  useEffect(() => {
    getIntegersRange();
  }, []);

  const getIntegersRange = useCallback(async () => {
    try {
      const {min, max} = await fetchIntegerRange();
      setInitialMin(min);
      setInitialMax(max);
    } catch (error) {
      console.error('Error fetching integer range:', error);
    }

  }, []);

  return { initialMin, initialMax }
}