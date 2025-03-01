import { forwardRef, useState, useEffect } from 'react';
import { FormField } from './FormField';

interface DatePickerProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  hint?: string;
  required?: boolean;
  minDate?: string;
  maxDate?: string;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
}

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  (
    {
      id,
      label,
      value,
      onChange,
      error,
      hint,
      required = false,
      minDate,
      maxDate,
      className = '',
      labelClassName = '',
      inputClassName = '',
    },
    ref
  ) => {
    const [inputValue, setInputValue] = useState(value);
    
    // Update local state when prop value changes
    useEffect(() => {
      setInputValue(value);
    }, [value]);
    
    // Format date for display (if needed)
    const formatDate = (dateString: string): string => {
      if (!dateString) return '';
      
      try {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0]; // YYYY-MM-DD format
      } catch (e) {
        return dateString;
      }
    };
    
    // Handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);
      onChange(newValue);
    };
    
    // Generate today's date for min date if not provided
    const today = new Date().toISOString().split('T')[0];
    const effectiveMinDate = minDate || today;
    
    // Add accessibility hint about date format
    const dateFormatHint = hint 
      ? `${hint} Format: YYYY-MM-DD.` 
      : 'Format: YYYY-MM-DD.';
    
    return (
      <FormField
        id={id}
        label={label}
        error={error}
        hint={dateFormatHint}
        required={required}
        className={className}
        labelClassName={labelClassName}
        inputClassName={inputClassName}
        type="date"
        value={inputValue}
        onChange={handleChange}
        min={effectiveMinDate}
        max={maxDate}
        ref={ref}
        // Add pattern for browsers that don't support date input
        pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
        // Add placeholder for browsers that don't support date input
        placeholder="YYYY-MM-DD"
      />
    );
  }
);

DatePicker.displayName = 'DatePicker';
