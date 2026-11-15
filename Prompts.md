# Prompts.md — AI Engineering & Architectural Debugging Log
**Internship Program:** ProDesk IT Internship Works  
**Sprint:** Sprint 07 — The Registration Wizard (Phase 3: Core Engineering)  
**Deliverable:** Mandatory AI Debugging & Architectural Documentation  
**Policy Compliance:** Adherence to "Learn, Don't Copy" Corporate AI Policy  

---

## 1. Overview & Architectural Philosophy
The objective of Sprint 7 is to construct an enterprise-grade, multi-step user onboarding wizard for SaaS and FinTech applications. To avoid the high abandonment rates associated with monolithic 20-field forms, data acquisition is segmented into localized views with persistent state, real-time validation guardrails, and optimal re-rendering cycles.

This document logs the AI collaboration sessions, architectural prompts, debugging discussions, and design decisions formulated to fulfill Phase 1 (P0), Phase 2 (P1), and Phase 3 (P2) sprint deliverables.

---

## 2. AI Interaction Logs & Architectural Discussions

### Session 1: State Lifting vs. Component Unmounting
* **Prompt to AI:**
  > *"When segmenting a wizard into separate step components conditionally rendered via `{step === 1 && <StepOne />}`, any local `useState` declared inside `StepOne` is destroyed when the user advances to Step 2. How should the state architecture be structured so input values persist when a user clicks 'Back'?"*

* **Architectural Insight & Synthesis:**
  * **Root Cause:** In React, when a component is unmounted from the DOM, its local hook state (`useState`) is garbage collected.
  * **Solution (Lifting State Up):** The master form state must reside in the parent component (`RegistrationWizard.jsx`). The parent instantiates the form context and passes registration triggers, field watchers, and validation states down to each step component via props.
  * **Implementation:** By registering inputs in a unified parent context, when `StepOne` unmounts and remounts, the inputs read their default/current values directly from the parent payload, guaranteeing zero data loss.

---

### Session 2: Enterprise Migration — React Hook Form vs. Monolithic useState
* **Prompt to AI:**
  > *"Why is standard `useState` considered an anti-pattern in enterprise multi-step forms with strict validation, and how does `react-hook-form` solve this?"*

* **Architectural Insight & Synthesis:**
  * **Performance Bottleneck with `useState`:** Every keystroke in a controlled input triggers a state update in the parent component, causing the entire form tree, buttons, headers, and sibling inputs to re-render.
  * **React Hook Form Solution:** `react-hook-form` utilizes uncontrolled inputs via standard React `ref` subscriptions. Changes occur in the DOM directly, and re-renders are only triggered when subscriber fields (like validation errors or watched fields) explicitly change.
  * **Key Configuration:** We configured `mode: 'onChange'` to satisfy the sprint's P1 requirement of dynamic, real-time error messages (such as missing `@` in email or passwords shorter than 8 characters) while retaining isolated render cycles.

---

### Session 3: Zod Schema Integration & Cross-Field Refinements
* **Prompt to AI:**
  > *"How do we enforce cross-field matching in Zod (e.g. `confirmPassword` matching `password`) while allowing per-step validation triggers with `@hookform/resolvers/zod`?"*

* **Architectural Insight & Synthesis:**
  * **Solution:** Defined modular schemas in `src/schemas/wizardSchema.js`:
    1. `stepOneSchema`: Validates First Name, Last Name, and Date of Birth (including an 18+ age verification check).
    2. `stepTwoSchema`: Validates Email (regex check for `@` and RFC structure), Password (min 8 chars, uppercase, lowercase, numeric, and special character), and applies `.refine((data) => data.password === data.confirmPassword, { path: ['confirmPassword'] })`.
    3. `masterRegistrationSchema`: Combines all step schemas for final form submission.
  * **Per-Step Navigation Validation:** The "Next" button invokes `trigger(['firstName', 'lastName', 'dob'])` for Step 1, or `trigger(['email', 'password', 'confirmPassword'])` for Step 2, preventing progression unless the localized schema clears.

---

### Session 4: Real-time Conditional Disabling & Button Navigation Trap
* **Prompt to AI:**
  > *"Our form was unexpectedly submitting and refreshing the page when clicking 'Next' or 'Back'. Furthermore, how do we conditionally disable the 'Next' button until local fields pass validation?"*

* **Architectural Insight & Synthesis:**
  * **Button Type Trap:** In HTML5, any `<button>` placed inside a `<form>` defaults to `type="submit"`. Navigation buttons (`Next`, `Back`, Show/Hide Password) must explicitly declare `type="button"`. Only the final submission trigger on Step 3 uses `type="submit"`.
  * **Conditional Disabling:** We implemented real-time schema evaluation using `safeParse` against watched values (`watch(...)`). The button's `disabled` prop is bound to `!isStepValid`, dynamically applying disabled opacity and cursor styles.

---

### Session 5: Cross-Platform File Casing & Deployment Auditing
* **Prompt to AI:**
  > *"Sprint FAQ #12 emphasizes that Windows filesystem is case-insensitive while Linux hosting environments (Vercel, Netlify) are strictly case-sensitive. How do we safeguard our repository?"*

* **Audit Results:**
  * Verified exact PascalCase naming across all component definitions and imports:
    * `src/components/StepOne.jsx`
    * `src/components/StepTwo.jsx`
    * `src/components/StepThree.jsx`
    * `src/components/SuccessView.jsx`
    * `src/components/ProgressBar.jsx`
    * `src/components/FormField.jsx`
    * `src/components/PasswordStrength.jsx`
    * `src/components/RegistrationWizard.jsx`
  * Tested production bundle with `npm run build` using Vite 8 client environment; compiled with 0 errors.

---

## 3. Summary of Deliverables Mapped to Sprint 7

| Requirement Phase | Feature Description | Implementation Location | Status |
| :--- | :--- | :--- | :---: |
| **Phase 1 (P0)** | 3 Distinct conditional views (Personal, Account, Review) | `RegistrationWizard.jsx`, `StepOne.jsx`, `StepTwo.jsx`, `StepThree.jsx` | **Complete** |
| **Phase 1 (P0)** | Navigation logic ("Next" and "Back" action triggers) | `handleNext()`, `handleBack()` in `RegistrationWizard.jsx` | **Complete** |
| **Phase 1 (P0)** | State Lifting (Data persists across step navigation) | Parent `useForm` master context in `RegistrationWizard.jsx` | **Complete** |
| **Phase 1 (P0)** | Final submission `console.log()` and Success UI state | `onFinalSubmit()` in `RegistrationWizard.jsx`, `SuccessView.jsx` | **Complete** |
| **Phase 2 (P1)** | Real-time regex validation (Email `@`, Password 8+ chars) | `wizardSchema.js`, `FormField.jsx`, `PasswordStrength.jsx` | **Complete** |
| **Phase 2 (P1)** | Confirm Password strict equality check | Zod `.refine()` in `wizardSchema.js` | **Complete** |
| **Phase 2 (P1)** | Conditional "Next" button disabling | `isStepValid` reactive guardrail in `StepOne.jsx` & `StepTwo.jsx` | **Complete** |
| **Phase 2 (P1)** | Show/Hide password toggle (eyeball icon) | `showPassword` state toggle in `StepTwo.jsx` | **Complete** |
| **Phase 2 (P1)** | Dynamic progress indicator ("Step X of 3" + visual bar) | `ProgressBar.jsx` | **Complete** |
| **Phase 3 (P2)** | Deprecate standard useState for `react-hook-form` | Integrated `useForm` across application | **Complete** |
| **Phase 3 (P2)** | Schema validation using `zod` and `@hookform/resolvers` | Strict Zod validation schemas in `src/schemas/wizardSchema.js` | **Complete** |
| **Phase 3 (P2)** | `Prompts.md` AI Debugging Session Documentation | `Prompts.md` in repository root | **Complete** |

---

## 4. Engineering Verification Checklist for 3-Minute QA Video
When recording the submission demo video:
1. **Show Step 1:** Type First Name and Last Name; demonstrate that "Next" is disabled until valid DOB is chosen.
2. **Advance to Step 2:** Show the dynamic progress bar animating from Step 1 to Step 2 (33% to 66%).
3. **Show Data Persistence:** Click "Back to Personal" — demonstrate that First Name, Last Name, and DOB are fully preserved. Advance back to Step 2.
4. **Demonstrate Real-Time Error Strings:**
   - Type an email without `@` -> observe the red validation error string render dynamically.
   - Enter password < 8 characters -> observe password strength bar and validation message.
   - Type mismatched Confirm Password -> observe dynamic "Passwords do not match" warning.
5. **Show Show/Hide Password Toggle:** Click the eyeball icon to toggle input visibility between masked and plain text.
6. **Advance to Step 3:** Review summarized data; demonstrate the "Edit" quick links jumping back to steps.
7. **Submit & Inspect Console:** Click "Submit Registration"; observe the celebration confetti, the Success UI screen, and open Chrome DevTools to show `console.log(finalizedPayload)` displaying the cleanly formatted JSON object.
