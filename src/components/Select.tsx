import { SelectHTMLAttributes, forwardRef } from 'react';
import { FormField } from './FormField';

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'id'> {
  id: string;
  label: string;
  options: Option[];
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
  labelClassName?: string;
  selectClassName?: string;
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      id,
      label,
      options,
      error,
      hint,
      required = false,
      className = '',
      labelClassName = '',
      selectClassName = '',
      placeholder = 'Select an option',
      ...selectProps
    },
    ref
  ) => {
    // Generate unique IDs for associated elements
    const hintId = hint ? `${id}-hint` : undefined;
    const errorId = error ? `${id}-error` : undefined;
    
    // Combine IDs for aria-describedby
    const descriptionIds = [hintId, errorId].filter(Boolean).join(' ');
    
    return (
      <FormField
        id={id}
        label={label}
        error={error}
        hint={hint}
        required={required}
        className={className}
        labelClassName={labelClassName}
      >
        <select
          ref={ref}
          id={id}
          aria-invalid={!!error}
          aria-required={required}
          aria-describedby={descriptionIds || undefined}
          className={`form-field__select ${error ? 'form-field__select--error' : ''} ${selectClassName}`}
          required={required}
          {...selectProps}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </FormField>
    );
  }
);

Select.displayName = 'Select';
