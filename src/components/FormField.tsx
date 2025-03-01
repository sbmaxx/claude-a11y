import { ReactNode, InputHTMLAttributes, forwardRef } from 'react';

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  children?: ReactNode;
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  (
    {
      id,
      label,
      error,
      hint,
      required = false,
      className = '',
      labelClassName = '',
      inputClassName = '',
      children,
      ...inputProps
    },
    ref
  ) => {
    // Generate unique IDs for associated elements
    const hintId = hint ? `${id}-hint` : undefined;
    const errorId = error ? `${id}-error` : undefined;
    
    // Combine IDs for aria-describedby
    const descriptionIds = [hintId, errorId].filter(Boolean).join(' ');
    
    return (
      <div className={`form-field ${error ? 'form-field--error' : ''} ${className}`}>
        <label 
          htmlFor={id} 
          className={`form-field__label ${labelClassName}`}
        >
          {label}
          {required && (
            <>
              <span aria-hidden="true"> *</span>
              <span className="sr-only"> (required)</span>
            </>
          )}
        </label>
        
        {hint && (
          <div id={hintId} className="form-field__hint">
            {hint}
          </div>
        )}
        
        {children || (
          <input
            ref={ref}
            id={id}
            aria-invalid={!!error}
            aria-required={required}
            aria-describedby={descriptionIds || undefined}
            className={`form-field__input ${error ? 'form-field__input--error' : ''} ${inputClassName}`}
            required={required}
            {...inputProps}
          />
        )}
        
        {error && (
          <div id={errorId} className="form-field__error" role="alert">
            {error}
          </div>
        )}
      </div>
    );
  }
);

FormField.displayName = 'FormField';
