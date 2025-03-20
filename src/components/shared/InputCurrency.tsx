import React, { useState, useEffect, ChangeEvent } from "react";
import { formatCurrency, parseCurrency } from "@/utils/formatCurrency";

interface CurrencyInputProps {
  name: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  placeholder?: string;
}

const InputCurrency: React.FC<CurrencyInputProps> = ({
  name,
  value,
  onChange,
  className,
  placeholder = "$0.00",
  ...rest
}) => {
  const [displayValue, setDisplayValue] = useState<string>("");

  useEffect(() => {
    setDisplayValue(formatCurrency(value));
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    const numericValue = parseCurrency(rawValue);
    const formattedValue = formatCurrency(numericValue);

    setDisplayValue(formattedValue);
    onChange({
      ...e,
      target: {
        ...e.target,
        name,
        value: numericValue.toString(),
      },
    });
  };

  return (
    <input
      type="text"
      name={name}
      value={displayValue}
      onChange={handleChange}
      placeholder={placeholder}
      className={className}
      {...rest}
    />
  );
};

export default InputCurrency;
