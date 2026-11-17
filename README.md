# Sprint 7: The Registration Wizard

A multi-step user registration wizard built in React with real-time client-side validation, state persistence, and responsive UI.

## Tech Stack
- **React 19**
- **Vite**
- **Tailwind CSS v4**
- **React Hook Form**
- **Zod**
- **Lucide React**

## Features

### Step 1: Personal Info
- First Name & Last Name inputs (minimum 2 characters, letters only)
- Date of Birth picker (minimum 18 years age validation)
- "Next" button remains disabled until all inputs are valid

### Step 2: Account Details
- Email input with real-time validation (requires `@` and valid domain)
- Password input (minimum 8 characters) with dynamic password strength meter
- Confirm Password with strict matching validation against the primary password
- Show/Hide Password toggle button (eyeball icon) to switch between text and password types
- "Back" button returns to Step 1 without losing any entered data (State Lifting)

### Step 3: Review & Submit
- Displays a clean summary of all entered details (Name, DOB, calculated age, Email, masked Password)
- Quick "Edit" buttons to jump back to Step 1 or Step 2
- Terms & Conditions acceptance checkbox
- On submit: Logs the final payload to `console.log()` and triggers a celebratory Success UI screen

## How to Run Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

3. Run tests:
   ```bash
   npm test
   ```

4. Build for production:
   ```bash
   npm run build
   ```
