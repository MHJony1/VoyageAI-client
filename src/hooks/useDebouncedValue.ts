import { useEffect, useState } from 'react';

/**
 * Returns a debounced copy of the value that only updates after `delay` ms
 * of no changes. Useful for search inputs to avoid a request per keystroke.
 */
export function useDebouncedValue<T>(value: T, delay = 400): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

export default useDebouncedValue;
