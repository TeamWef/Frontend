import { useCallback, useState } from "react";

export function useInput(initialValue) {
  const [value, setValue] = useState(initialValue);

  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const reset = useCallback(() => setValue(initialValue), []);
  return [value, onChange, reset, setValue];
}

export function useInputs(initialValue) {
  const [values, setValues] = useState(initialValue);

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const reset = useCallback(() => setValues(initialValue), []);
  return [values, onChange, reset];
}
