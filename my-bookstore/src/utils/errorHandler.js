// Utility functions for error handling

export const handleApiError = (error, fallbackMessage = 'An error occurred') => {
  if (error.response) {
    // Server responded with error status
    return error.response.data?.message || fallbackMessage;
  } else if (error.request) {
    // Request was made but no response received
    return 'Network error. Please check your connection.';
  } else {
    // Something else happened
    return error.message || fallbackMessage;
  }
};

export const safeExecute = async (asyncFunction, fallback = null) => {
  try {
    return await asyncFunction();
  } catch (error) {
    console.error('Safe execute error:', error);
    return fallback;
  }
};

export const validateRequired = (fields) => {
  const errors = {};
  
  Object.entries(fields).forEach(([key, value]) => {
    if (!value || (typeof value === 'string' && !value.trim())) {
      errors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const formatPrice = (price) => {
  if (typeof price !== 'number') return '$0.00';
  return `$${price.toFixed(2)}`;
};

export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};