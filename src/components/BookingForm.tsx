import { useState, FormEvent } from 'react';
import { Select } from './Select';
import { DatePicker } from './DatePicker';

// Define city options
const cityOptions = [
  { value: 'moscow', label: 'Moscow' },
  { value: 'st-petersburg', label: 'St. Petersburg' },
  { value: 'kazan', label: 'Kazan' },
  { value: 'sochi', label: 'Sochi' },
  { value: 'novosibirsk', label: 'Novosibirsk' },
  { value: 'yekaterinburg', label: 'Yekaterinburg' },
  { value: 'vladivostok', label: 'Vladivostok' },
];

// Define passenger options
const passengerOptions = Array.from({ length: 9 }, (_, i) => ({
  value: String(i + 1),
  label: String(i + 1),
}));

// Define class options
const classOptions = [
  { value: 'economy', label: 'Economy' },
  { value: 'comfort', label: 'Comfort' },
  { value: 'business', label: 'Business' },
];

interface FormData {
  from: string;
  to: string;
  departDate: string;
  returnDate: string;
  passengers: string;
  class: string;
}

interface FormErrors {
  from?: string;
  to?: string;
  departDate?: string;
  returnDate?: string;
  passengers?: string;
  class?: string;
  general?: string;
}

export const BookingForm = () => {
  // Form state
  const [formData, setFormData] = useState<FormData>({
    from: '',
    to: 'st-petersburg', // Default to St. Petersburg as destination
    departDate: '',
    returnDate: '',
    passengers: '1',
    class: 'economy',
  });
  
  // Form errors state
  const [errors, setErrors] = useState<FormErrors>({});
  
  // Success state
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Handle input changes
  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    
    // Clear error for this field when it changes
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };
  
  // Validate form
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    // Required fields
    if (!formData.from) {
      newErrors.from = 'Please select a departure city';
    }
    
    if (!formData.to) {
      newErrors.to = 'Please select a destination city';
    }
    
    if (formData.from && formData.to && formData.from === formData.to) {
      newErrors.to = 'Departure and destination cities cannot be the same';
    }
    
    if (!formData.departDate) {
      newErrors.departDate = 'Please select a departure date';
    }
    
    // If return date is provided, make sure it's after depart date
    if (formData.returnDate && formData.departDate && new Date(formData.returnDate) < new Date(formData.departDate)) {
      newErrors.returnDate = 'Return date must be after departure date';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Reset success state
    setIsSuccess(false);
    
    // Validate form
    if (validateForm()) {
      // In a real app, you would submit the form data to a server here
      console.log('Form submitted:', formData);
      
      // Show success message
      setIsSuccess(true);
      
      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  return (
    <div className="booking-form-container">
      <h1>Book Your Flight to St. Petersburg</h1>
      
      {isSuccess && (
        <div className="success-message" role="alert" tabIndex={-1}>
          <h2>Booking Request Submitted!</h2>
          <p>
            Thank you for your booking request. We are processing your flight from{' '}
            {cityOptions.find((city) => city.value === formData.from)?.label} to{' '}
            {cityOptions.find((city) => city.value === formData.to)?.label} on{' '}
            {new Date(formData.departDate).toLocaleDateString()}.
          </p>
          <p>You will receive a confirmation email shortly.</p>
        </div>
      )}
      
      {errors.general && (
        <div className="error-message" role="alert">
          {errors.general}
        </div>
      )}
      
      <form 
        onSubmit={handleSubmit} 
        className="booking-form"
        aria-label="Flight booking form"
        noValidate
      >
        <div className="form-row">
          <Select
            id="from"
            label="From"
            options={cityOptions}
            value={formData.from}
            onChange={(e) => handleChange('from', e.target.value)}
            error={errors.from}
            required
            placeholder="Select departure city"
            className="form-field--half"
          />
          
          <Select
            id="to"
            label="To"
            options={cityOptions}
            value={formData.to}
            onChange={(e) => handleChange('to', e.target.value)}
            error={errors.to}
            required
            placeholder="Select destination city"
            className="form-field--half"
          />
        </div>
        
        <div className="form-row">
          <DatePicker
            id="departDate"
            label="Departure Date"
            value={formData.departDate}
            onChange={(value) => handleChange('departDate', value)}
            error={errors.departDate}
            required
            className="form-field--half"
          />
          
          <DatePicker
            id="returnDate"
            label="Return Date (Optional)"
            value={formData.returnDate}
            onChange={(value) => handleChange('returnDate', value)}
            error={errors.returnDate}
            minDate={formData.departDate}
            className="form-field--half"
            hint="Leave empty for one-way flight."
          />
        </div>
        
        <div className="form-row">
          <Select
            id="passengers"
            label="Passengers"
            options={passengerOptions}
            value={formData.passengers}
            onChange={(e) => handleChange('passengers', e.target.value)}
            error={errors.passengers}
            required
            className="form-field--half"
          />
          
          <Select
            id="class"
            label="Class"
            options={classOptions}
            value={formData.class}
            onChange={(e) => handleChange('class', e.target.value)}
            error={errors.class}
            required
            className="form-field--half"
          />
        </div>
        
        <div className="form-actions">
          <button type="submit" className="submit-button">
            Search Flights
          </button>
        </div>
      </form>
    </div>
  );
};
