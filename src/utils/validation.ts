export interface ValidationErrors {
  [key: string]: string;
}

export const validateUserForm = (formData: {
  first_name: string;
  last_name: string;
  age: number;
  dt_birth: string;
  balance: number;
}): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!formData.first_name.trim()) {
    errors.first_name = "First Name is required.";
  }

  if (!formData.last_name.trim()) {
    errors.last_name = "Last Name is required.";
  }

  if (formData.age <= 0) {
    errors.age = "Age must be greater than 0.";
  }

  if (!formData.dt_birth) {
    errors.dt_birth = "Date of Birth is required.";
  }

  if (formData.balance < 0) {
    errors.balance = "Balance cannot be negative.";
  }

  return errors;
};
