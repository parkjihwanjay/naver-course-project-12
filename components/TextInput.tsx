import React, { useEffect, useRef, useState } from 'react';

interface IProps {
  defaultValue: string;
  handleItemSave: (newContent: string) => void;
}
const TextInput: React.FC<IProps> = ({ defaultValue, handleItemSave }) => {
  const [value, setValue] = useState<string>(defaultValue);
  const editingInput = useRef<HTMLInputElement>();

  useEffect(() => {
    document.addEventListener('mousedown', handleOuterClick);
    editingInput.current.focus();
    return () => {
      document.removeEventListener('mousedown', handleOuterClick);
    };
  }, [value]);

  const handleOuterClick = (e: React.MouseEvent): void => {
    const target = e.target as Element;
    if (!editingInput.current.contains(target)) {
      return handleItemSave(value);
    }
  };

  const handleChange = (e: React.ChangeEvent): void => {
    const inputElement = e.target as HTMLInputElement;
    const currentValue = inputElement.value;
    setValue(currentValue);
  };

  const preventAndStopEvent = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <input
      ref={editingInput}
      onChange={handleChange}
      defaultValue={defaultValue}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === 'Escape') return handleItemSave(value);
      }}
      onDrag={preventAndStopEvent}
      onDragEnter={preventAndStopEvent}
      onDragStart={preventAndStopEvent}
      onDragOver={preventAndStopEvent}
      onDragEnd={preventAndStopEvent}
      onDrop={preventAndStopEvent}
      draggable="true"
      type="text"
    />
  );
};
export default TextInput;
