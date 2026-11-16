import { z } from 'zod';

// Step 1: Personal Info Schema
export const stepOneSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, 'First name is required')
    .min(2, 'First name must be at least 2 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'First name can only contain letters, spaces, or hyphens'),
  lastName: z
    .string()
    .trim()
    .min(1, 'Last name is required')
    .min(2, 'Last name must be at least 2 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Last name can only contain letters, spaces, or hyphens'),
  dob: z
    .string()
    .min(1, 'Date of birth is required')
    .refine((val) => {
      if (!val) return false;
      const parts = val.split('-').map(Number);
      if (parts.length !== 3 || parts.some(isNaN)) return false;
      const date = new Date(parts[0], parts[1] - 1, parts[2]);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date < today;
    }, 'Date of birth cannot be today or in the future')
    .refine((val) => {
      if (!val) return false;
      const parts = val.split('-').map(Number);
      if (parts.length !== 3 || parts.some(isNaN)) return false;
      const birthDate = new Date(parts[0], parts[1] - 1, parts[2]);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age >= 18;
    }, 'Applicant must be at least 18 years of age')
    .refine((val) => {
      if (!val) return false;
      const parts = val.split('-').map(Number);
      if (parts.length !== 3 || parts.some(isNaN)) return false;
      const birthDate = new Date(parts[0], parts[1] - 1, parts[2]);
      const today = new Date();
      return today.getFullYear() - birthDate.getFullYear() <= 120;
    }, 'Please enter a valid birth year'),
});

// Step 2: Account Details Schema
export const stepTwoSchema = z
  .object({
    email: z
      .string()
      .min(1, 'Email address is required')
      .regex(/@/, "Email must contain an '@' symbol")
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email format (e.g., name@company.com)'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must be at least 8 characters long'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

// Step 3: Terms acceptance & Combined Full Schema
export const stepThreeSchema = z.object({
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: 'You must review and accept the Terms & Conditions' }),
  }),
});

// Full Master Schema combining all steps
export const masterRegistrationSchema = z.object({
  ...stepOneSchema.shape,
  ...stepTwoSchema.shape,
  ...stepThreeSchema.shape,
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export const defaultFormValues = {
  firstName: '',
  lastName: '',
  dob: '',
  email: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false,
};
