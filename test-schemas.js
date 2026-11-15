import {
  stepOneSchema,
  stepTwoSchema,
  stepThreeSchema,
  masterRegistrationSchema,
} from './src/schemas/wizardSchema.js';

console.log('--- STARTING COMPREHENSIVE SCHEMA VALIDATION SUITE ---');

let passedTests = 0;
let totalTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    console.log(`✅ PASS: ${message}`);
    passedTests++;
  } else {
    console.error(`❌ FAIL: ${message}`);
  }
}

// 1. Step 1: Personal Info
assert(
  !stepOneSchema.safeParse({ firstName: '', lastName: '', dob: '' }).success,
  'Step 1 rejects empty fields'
);

assert(
  !stepOneSchema.safeParse({ firstName: 'A', lastName: 'Mercer', dob: '1998-05-14' }).success,
  'Step 1 rejects first name with length < 2'
);

// Date of birth: Under 18
const today = new Date();
const underAgeDate = `${today.getFullYear() - 10}-01-01`;
assert(
  !stepOneSchema.safeParse({ firstName: 'Alex', lastName: 'Mercer', dob: underAgeDate }).success,
  'Step 1 rejects applicant under 18 years old'
);

// Future date
const futureDate = `${today.getFullYear() + 2}-01-01`;
assert(
  !stepOneSchema.safeParse({ firstName: 'Alex', lastName: 'Mercer', dob: futureDate }).success,
  'Step 1 rejects future birthdate'
);

// Valid Step 1
const validStep1 = { firstName: 'Alex', lastName: 'Mercer', dob: '1998-05-14' };
assert(
  stepOneSchema.safeParse(validStep1).success,
  'Step 1 accepts valid personal details (Alex Mercer, 1998-05-14)'
);

// 2. Step 2: Account Details
assert(
  !stepTwoSchema.safeParse({ email: 'alexmercer', password: 'ValidPassword123!', confirmPassword: 'ValidPassword123!' }).success,
  'Step 2 rejects email missing "@"'
);

assert(
  !stepTwoSchema.safeParse({ email: 'alex@', password: 'ValidPassword123!', confirmPassword: 'ValidPassword123!' }).success,
  'Step 2 rejects incomplete email format'
);

assert(
  !stepTwoSchema.safeParse({ email: 'alex@company.com', password: 'short', confirmPassword: 'short' }).success,
  'Step 2 rejects password shorter than 8 chars'
);

assert(
  !stepTwoSchema.safeParse({ email: 'alex@company.com', password: 'ValidPassword123!', confirmPassword: 'DifferentPassword123!' }).success,
  'Step 2 rejects mismatched confirmPassword'
);

const validStep2 = {
  email: 'alex.mercer@company.com',
  password: 'SecurePass!2026',
  confirmPassword: 'SecurePass!2026',
};
assert(
  stepTwoSchema.safeParse(validStep2).success,
  'Step 2 accepts compliant email, strong password, and matching confirmPassword'
);

// 3. Step 3: Terms acceptance
assert(
  !stepThreeSchema.safeParse({ acceptTerms: false }).success,
  'Step 3 rejects unaccepted terms'
);

assert(
  stepThreeSchema.safeParse({ acceptTerms: true }).success,
  'Step 3 accepts signed declaration'
);

// 4. Master Schema
const fullPayload = {
  ...validStep1,
  ...validStep2,
  acceptTerms: true,
};

assert(
  masterRegistrationSchema.safeParse(fullPayload).success,
  'Master schema validates full combined onboarding payload'
);

console.log(`\n======================================================`);
console.log(`RESULTS: ${passedTests}/${totalTests} TESTS PASSED SUCCESSFULLY!`);
console.log(`======================================================`);

if (passedTests !== totalTests) {
  process.exit(1);
}
