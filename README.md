# The Registration Wizard — ProDesk IT Internship Works (Sprint 07)

[![React](https://img.shields.io/badge/React-19-61dafb.svg?style=flat&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646cff.svg?style=flat&logo=vite)](https://vite.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8.svg?style=flat&logo=tailwindcss)](https://tailwindcss.com)
[![React Hook Form](https://img.shields.io/badge/React_Hook_Form-7-ec5990.svg?style=flat&logo=reacthookform)](https://react-hook-form.com)
[![Zod](https://img.shields.io/badge/Zod-3-3068b7.svg?style=flat&logo=zod)](https://zod.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **Phase 3: Core Engineering Deliverable**  
> An enterprise-grade, multi-step SaaS & FinTech client data onboarding wizard engineered with **React Hook Form**, **Zod** schema validation, and real-time client-side guardrails.

---

## 📋 Table of Contents
- [Project Overview](#project-overview)
- [Architecture & Phase Coverage](#architecture--phase-coverage)
- [Key Features](#key-features)
- [Directory Structure](#directory-structure)
- [Getting Started](#getting-started)
- [Deployment Guide](#deployment-guide)
- [QA Demo Video Walkthrough](#qa-demo-video-walkthrough)
- [AI Documentation (`Prompts.md`)](#ai-documentation-promptsmd)

---

## 🚀 Project Overview

Modern enterprise applications avoid overwhelming users with monolithic 20-field forms. **The Registration Wizard** segments complex user data acquisition into three distinct, localized, and validated views:

1. **Step 1: Personal Profile** — First Name, Last Name, and Date of Birth (with 18+ age verification).
2. **Step 2: Authentication & Security** — Corporate Email, Master Password (with live strength criteria), and Confirm Password (strict equality).
3. **Step 3: Review & Finalize** — Data review summary with step editing triggers, legal declaration, and final payload submission.
4. **Step 4: Success UI State** — Payload inspector, clipboard export, and confetti celebration.

---

## 🛠️ Architecture & Phase Coverage

### Phase 1: Base MVP & State Architecture (Mandatory - P0)
- **UI Segmentation:** Single-route conditional rendering toggling between views without hard-reloading.
- **Navigation Logic:** "Next" and "Back" action triggers controlling active step transitions.
- **State Lifting:** Master form state is lifted to the parent `RegistrationWizard.jsx` component. When a user navigates between steps, inputs retain their values when clicking "Back".
- **Submission Payload:** Form finalization logs the unified payload via `console.log()` and transitions to a dedicated "Success" screen.

### Phase 2: Client-Side Validation & UX Polish (P1)
- **Real-Time Validation (Regex & Schema):** Dynamic `onChange` validation checking for `@` in emails, valid domain formats, and password constraints.
- **Password Security:** Enforces minimum 8 characters, uppercase, lowercase, numeric, and special symbols, accompanied by a dynamic 5-segment strength meter.
- **Strict Equality:** Confirm Password dynamically verifies match against primary password.
- **Conditional Disabling:** Navigation buttons remain unclickable until all fields in the active view clear validation.
- **UX Toggles:** Show/Hide password eyeball toggle changing input type between `text` and `password`.
- **Dynamic Progress Indicator:** Top-level progress bar displaying "Step X of 3" and percentage completion.

### Phase 3: Enterprise Form Architecture (P2 - Top Engineering Rating)
- **React Hook Form:** Deprecated standard `useState` form trees in favor of uncontrolled inputs, isolating re-render cycles and dramatically boosting rendering performance.
- **Zod Schema Engine:** Type-safe schema definitions via `@hookform/resolvers/zod` ensuring declarative input guardrails.
- **Prompts.md:** Comprehensive documentation of AI debugging sessions and architectural decisions adhering to the "Learn, Don't Copy" mandate.

---

## 📂 Directory Structure

```
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── FormField.jsx             # Reusable accessible input with real-time feedback
│   │   ├── PasswordStrength.jsx      # Live password criteria checklist & strength bar
│   │   ├── ProgressBar.jsx           # Animated progress bar & step breadcrumbs
│   │   ├── RegistrationWizard.jsx    # Master Parent Component (State Lifting & RHF Context)
│   │   ├── StepOne.jsx               # Personal Info View (First Name, Last Name, DOB)
│   │   ├── StepTwo.jsx               # Account Details View (Email, Passwords, Eye toggle)
│   │   ├── StepThree.jsx             # Review & Submit View (Summary cards & consent)
│   │   └── SuccessView.jsx           # Success screen with confetti & payload viewer
│   ├── schemas/
│   │   └── wizardSchema.js           # Modular Zod schemas & cross-field validations
│   ├── App.css                       # Minimal custom styling
│   ├── App.jsx                       # Application shell, navbar, and QA checklist modal
│   ├── index.css                     # Tailwind CSS v4 styling & theme setup
│   └── main.jsx                      # React 19 entry point
├── index.html                        # HTML5 document with customized metadata
├── package.json
├── Prompts.md                        # Mandatory AI debugging log
├── README.md                         # Project documentation
└── vite.config.js                    # Vite configuration with Tailwind CSS v4 plugin
```

> **Note on File Casing:** All files follow strict PascalCase naming conventions to ensure zero casing mismatches on Linux CI/CD environments (Vercel/Netlify).

---

## 💻 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher (Tested on Node v24)
- **npm**: v9.0.0 or higher

### Installation
1. Clone or download this repository.
2. In the project root, install all dependencies:
   ```bash
   npm install
   ```

### Running Locally
Start the Vite development server:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### Production Build
Test and compile the production bundle:
```bash
npm run build
```
Preview the built bundle:
```bash
npm run preview
```

---

## 🌐 Deployment Guide

### Deploying to Vercel (Recommended)
1. Push your code to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "feat: complete sprint 7 registration wizard"
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
2. Log into [Vercel](https://vercel.com).
3. Click **"Add New Project"** and import your repository.
4. Keep the default settings:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Click **Deploy**.

### Deploying to Netlify
1. Log into [Netlify](https://netlify.com).
2. Click **"Add new site"** -> **"Import an existing project"**.
3. Connect your GitHub repository.
4. Set build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Click **Deploy Site**.

---

## 📹 QA Demo Video Walkthrough (3-Minute Script)

For your submission video, follow this exact sequence:

1. **Phase 1: Step 1 (Personal Info)**
   - Enter invalid or short first name -> observe real-time validation message.
   - Enter valid First Name ("Alex") and Last Name ("Mercer").
   - Notice the "Next" button remains disabled until a valid Date of Birth (18+ years old) is selected.
   - Choose a valid birthdate -> click **"Continue to Account"**.
2. **Phase 1: State Lifting Verification**
   - Click **"Back to Personal"**.
   - **Crucial:** Highlight that all inputs in Step 1 retained their values without loss.
   - Click **"Continue to Account"** again.
3. **Phase 2: Step 2 Real-Time Validation**
   - Type an email without `@` -> show dynamic red error string.
   - Complete valid email (`alex.mercer@company.com`) -> show green checkmark.
   - Type a short password -> show password strength bar and criteria checklist.
   - Click the **Eyeball icon** to toggle password visibility (plain text vs masked).
   - Enter a mismatched Confirm Password -> show dynamic "Passwords do not match" error.
   - Correct Confirm Password -> notice "Review Submission" button becomes enabled!
4. **Phase 3: Step 3 (Review & Final Submission)**
   - Advance to Step 3.
   - Review summarized Personal and Account details.
   - Check the legal consent declaration.
   - Open Developer Tools Console (`F12` -> `Console`).
   - Click **"Submit Registration"**.
   - Show the celebration confetti, the Success UI card, and the clean `console.log(finalizedPayload)` in DevTools!

---

## 📞 Support & Contacts
- **Point of Contact:** Mr. Nakul (`8851407750`)
- **Support Window:** Monday – Friday | 10:00 AM – 12:00 PM IST
- **Support Email:** `info@prodesk.in`
