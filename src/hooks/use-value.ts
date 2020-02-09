import { useRef, useState, useEffect } from "react";

const useValue = <T extends any>(initialState: T): { value: T } => {
  const ref = useRef<T>(initialState);
  let [state, setState] = useState<T>(initialState);

  const proxy: any = {
    get value() {
      return ref.current;
    },
    set value(val) {
      setState(() => val);
    }
  };

  useEffect(() => {
    ref.current = state;
  }, [state, ref]);

  return proxy;
};

export default useValue;
