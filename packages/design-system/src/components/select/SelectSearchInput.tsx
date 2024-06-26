import type { InputHTMLAttributes, Ref } from 'react';
import React, { useEffect } from 'react';
import { SelectDataContext } from './index';
import { useContextData } from '@hooks';

interface SelectSearchInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  placeholder: string;
  onChange?: (value: string, e?: React.ChangeEvent<HTMLInputElement>) => void;
}
export const SelectSearchInput = (
  { value, onChange, placeholder, className, ...props }: SelectSearchInputProps,
  ref: Ref<HTMLInputElement>,
) => {
  const data = useContextData('Select.SearchInput', SelectDataContext);

  useEffect(() => {
    return () => {
      onChange?.('');
    };
  }, [onChange]);

  useEffect(() => {
    const inputRef = ref as React.RefObject<HTMLInputElement>;
    if (inputRef?.current) {
      inputRef.current?.focus();
    }

    return () => {
      if (inputRef?.current) {
        inputRef.current.blur();
      }
    };
  }, []);

  return (
    data.open && (
      <input
        ref={ref}
        value={value}
        placeholder={placeholder}
        className={className}
        onChange={(e) => {
          onChange?.(e.target.value.toLowerCase(), e);
        }}
        {...props}
      />
    )
  );
};
