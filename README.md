# Orange Cat Studies

**Orange Cat Studies** is a web-based study assistant designed to support candidates preparing for public service exams in Brazil. It combines strategic learning with motivational design by delivering daily exercises and offering collectible rewards based on user performance. The system facilitates the structured registration of exam content, provides intelligent question delivery, and promotes engagement through gamification, offering a complete and modern solution to improve study consistency and retention.

---

## Overview

The core objective of Orange Cat Studies is to transform the solitary and repetitive nature of public exam preparation into a dynamic and interactive experience. Users engage in daily challenges consisting of ten questions in Mathematics and Logical Reasoning. Upon completion, a Garfield comic strip is unlocked, which is added to a personalized sticker album presented in a calendar layout.

Additionally, the platform includes performance tracking, content review tools, and automatic PDF parsing for efficient exam registration, all delivered through an intuitive and responsive interface.

---

## Key Features

### Implemented

- **User Authentication:** Secure registration and login with Firebase (email/password and Google).
- **Protected Routes:** Restricted access to core functionality based on authentication.
- **Exam Registration:**
  - Manual: Allows users to input exam details including name, board, level, year, and position.
  - Automatic: Extracts key data from uploaded PDF files using structured text parsing.
- **Daily Challenges:**
  - Displays ten randomized or fixed questions per day.
  - Interactive multiple-choice interface with visual feedback on selection.
- **Comic Reward System:** Unlocks a Garfield strip upon quiz completion.
- **Responsive Layout:** Optimized for mobile and desktop access.
- **Visual Identity:** Follows a minimalistic Garfield-inspired design using custom typography and color palette.
- **Navigation Components:** Fully implemented dynamic Navbar and Footer with contextual links.

### In Development

- **Dynamic Daily Question Engine:** Rotates unique questions daily, preventing repetition.
- **Answer Validation and Feedback:** Highlights correct and incorrect answers post-submission.
- **Topic Review List:** Enables users to mark questions for later review.
- **Comic Album Interface:** Displays collected comics in a calendar-based visual layout.
- **Performance Analytics:** Weekly and monthly performance charts to monitor user progress.

---

## Technologies and Architecture

- **Frontend:** React.js with TypeScript, styled using Tailwind CSS (customized with brand typography and palette).
- **Backend:** Node.js + Express.
- **Authentication:** Firebase Authentication.
- **Databases:**
  - **MySQL:** Stores relational content (users, exams, questions).
  - **MongoDB Atlas:** Stores comic strips metadata.
- **PDF Processing:** `pdfjs-dist` for in-browser text extraction.
- **Other Libraries:** Axios, Lucide React, Concurrently, PostCSS.

---

## System Architecture

```
orange-cat-studies/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Footer.tsx
│   │   ├── Navbar.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── AddExamPage.tsx
│   │   ├── ManualExamForm.tsx
│   │   ├── QuestionsPage.tsx
│   ├── services/
│   │   └── firebaseConfig.js
│   ├── App.tsx
│   ├── index.tsx
│   └── index.css
├── backend/
│   ├── config/
│   │   └── firebase/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

---

## Installation and Setup

### Prerequisites

- Node.js and npm.
- MySQL or compatible database.
- MongoDB Atlas URI.
- Firebase project with Admin SDK JSON.

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/fleurspirituelles/orange-cat-studies.git
   cd orange-cat-studies
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`.

---

## Presentation and Purpose

Orange Cat Studies was developed as an academic graduation project. It aims to demonstrate advanced technical implementation through the integration of real-time authentication, dynamic question management, automatic data extraction from unstructured sources, and a user-centric interface inspired by educational gamification.
