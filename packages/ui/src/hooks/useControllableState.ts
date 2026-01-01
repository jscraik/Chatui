import { useCallback, useState } from "react";

export interface ControllableStateOptions<T> {
  value?: T;
  defaultValue: T;
  onChange?: (next: T) => void;
}

export type SetControllableState<T> = (next: T | ((prev: T) => T)) => void;

export function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: ControllableStateOptions<T>): [T, SetControllableState<T>] {
  const [uncontrolledValue, setUncontrolledValue] = useState<T>(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? (value as T) : uncontrolledValue;

  const setValue = useCallback<SetControllableState<T>>(
    (next) => {
      const resolved = typeof next === "function" ? (next as (prev: T) => T)(currentValue) : next;

      if (!isControlled) {
        setUncontrolledValue(resolved);
      }

      onChange?.(resolved);
    },
    [currentValue, isControlled, onChange],
  );

  return [currentValue, setValue];
}
