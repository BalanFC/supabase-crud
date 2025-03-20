import React from "react";

interface InputDateProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const InputDate: React.FC<InputDateProps> = ({
  name,
  value,
  onChange,
  className,
}) => {
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event);
  };

  return (
    <input
      type="date"
      name={name}
      value={value}
      onChange={handleDateChange}
      className={className}
    />
  );
};

export default InputDate;
