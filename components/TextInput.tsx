import React, { useEffect, useRef, useState } from 'react';

interface IProps {
  defaultValue: string;
  handleItemSave: (newContent: string) => void;
}
const TextInput: React.FC<IProps> = ({ defaultValue, handleItemSave }) => {
  const [value, setValue] = useState<string>(defaultValue);
  const editingInput = useRef<HTMLInputElement>();

  useEffect(() => {
    const handleOuterClick = (e: React.MouseEvent): void => {
      const target = e.target as Element;
      if (!editingInput.current.contains(target)) {
        return handleItemSave(value);
      }
    };

    document.addEventListener('mousedown', handleOuterClick);
    return () => {
      document.removeEventListener('mousedown', handleOuterClick);
    };
  }, [value]);

  const handleChange = (e: React.ChangeEvent): void => {
    const inputElement = e.target as HTMLInputElement;
    const currentValue = inputElement.value;
    setValue(currentValue);
  };
  return (
    <input
      ref={editingInput}
      onChange={handleChange}
      defaultValue={defaultValue}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === 'Escape') return handleItemSave(value);
      }}
      type="text"
    />
  );
};
export default TextInput;
