import React, { useState, SyntheticEvent } from 'react';

interface IProps {
  defaultValue: string;
  className: string;
  onKeyDown: (e: SyntheticEvent, newContent: string) => void;
  onMouseDown: (e: SyntheticEvent, newContent: string) => void;
}
const TextInput: React.FC<IProps> = ({ defaultValue, className, onKeyDown, onMouseDown }) => {
  const [value, setValue] = useState<string>(defaultValue);
  const handleChange = (e: React.ChangeEvent): void => {
    const inputElement = e.target as HTMLInputElement;
    const currentValue = inputElement.value;

    setValue(currentValue);
  };
  return (
    <input
      onChange={handleChange}
      defaultValue={defaultValue}
      className={className}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === 'Escape') return onKeyDown(e, value);
      }}
      type="text"
    />
  );
};
export default TextInput;
