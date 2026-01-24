import { useState, useEffect } from 'react';

export const useFormValidation = (initialValues, validateRules) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const newErrors = {};
    
    for (const fieldName in validateRules) {
      const rule = validateRules[fieldName];
      const value = values[fieldName];
      
      if (rule.required && !value) {
        newErrors[fieldName] = rule.requiredMessage || `${fieldName} is required`;
      } else if (rule.pattern && value && !rule.pattern.test(value)) {
        newErrors[fieldName] = rule.patternMessage || `${fieldName} is invalid`;
      } else if (rule.minLength && value && value.length < rule.minLength) {
        newErrors[fieldName] = rule.minLengthMessage || `${fieldName} is too short`;
      } else if (rule.validate && value) {
        const result = rule.validate(value, values);
        if (typeof result === 'string') {
          newErrors[fieldName] = result;
        }
      }
    }
    
    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
  }, [values]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  return {
    values,
    errors,
    isValid,
    handleChange,
    resetForm,
    setValues
  };
};