// validationMessages.ts
export const validationMessages = {
  minLength: (field: string, length: number) =>
    `${field} must be at least ${length} characters long`,
  maxLength: (field: string, length: number) =>
    `${field} must be no more than ${length} characters long`,
  required: (field: string) => `${field} is required`,
  invalidEmail: (field: string) => `${field} must be a valid email address`,
  digit: (field: string) => `${field} must contain at least one digit`,
  specialChar: (field: string) =>
    `${field} must contain at least one special character`,
  uppercase: (field: string) =>
    `${field} must contain at least one uppercase letter`,
  emailAlreadyInUse: (email: string) => `The email ${email} is already in use.`,
};

export const regexPatterns = {
  digit: /\d/, // At least one digit
  specialChar: /[!@#$%^&*(),.?":{}|<>]/, // At least one special character
  uppercase: /[A-Z]/, // At least one uppercase character
};
