# Orange Cat Studies

**Orange Cat Studies** is a web-based study assistant designed to support candidates preparing for public service exams in Brazil. It combines strategic learning with motivational design by delivering daily exercises and offering collectible rewards based on user performance. The system facilitates the structured registration of exam content, provides intelligent question delivery, and promotes engagement through gamification, offering a complete and modern solution to improve study consistency and retention.

## Overview

The core objective of Orange Cat Studies is to transform the solitary and repetitive nature of public exam preparation into a dynamic and interactive experience. Users engage in daily challenges consisting of ten questions in Mathematics and Logical Reasoning. Upon completion, a Garfield comic strip is unlocked, which is added to a personalized sticker album presented in a calendar layout. Additionally, the platform includes automatic PDF parsing for efficient exam registration, offering a practical and responsive interface.

## Key Features

### Implemented

- **User Authentication:** Secure registration and login with Firebase (email/password and Google).
- **Protected Routes:** Restricted access to core functionality based on authentication.
- **Exam Registration:**
  - Manual: Allows users to input exam details including name, board, level, year, and position.
  - Automatic: Extracts key data from uploaded PDF files using structured text parsing.
- **Daily Challenges:**
  - Displays ten randomized questions per day.
  - Interactive multiple-choice interface with immediate visual feedback on selection.
- **Answer Validation and Feedback:** Highlights correct and incorrect answers after submission.
- **Comic Reward System:** Unlocks a Garfield strip upon quiz completion.
- **Monthly Statistics:** Displays total number of correct answers achieved within the current month.
- **Responsive Layout:** Optimized for mobile and desktop access.
- **Visual Identity:** Minimalistic Garfield-inspired design using custom typography and color palette.
- **Navigation Components:** Fully implemented dynamic Navbar and Footer with contextual links.

### Upcoming Features

- **Question Review List:** Enables users to mark questions for later review.
- **Performance Analytics:** Weekly and monthly performance charts to monitor user progress.

## Technologies and Architecture

- **Frontend:** React.js with TypeScript, styled using Tailwind CSS (customized with brand typography and palette).
- **Backend:** Node.js with Express.
- **Authentication:** Firebase Authentication (email/password and Google).
- **Database:** MySQL (mysql2) stores relational data (users, exams, questions, answers, comics, performances).
- **PDF Processing:** `pdf-parse` for server-side PDF text extraction.
- **File Upload Handling:** `multer` for processing uploaded PDF files.
- **API Communication:** Axios.
- **Icons Library:** Lucide React.
- **Task Management:** Concurrently (for running backend and frontend simultaneously in development).
- **Styling Tools:** Tailwind CSS, PostCSS, Autoprefixer.
- **Utilities:** clsx (conditional classNames).
- **Languages and Types:** TypeScript.

## System Architecture

```
orange-cat-studies/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── firebase/
│   ├── lib/
│   ├── App.tsx
│   ├── index.tsx
│   ├── index.css
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── firebase/
│   ├── middlewares/
│   ├── utils/
│   ├── schema.sql
│   ├── server.js
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## Installation and Setup

### Prerequisites

- Node.js and npm.
- MySQL or compatible database.
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

## Presentation and Purpose

Orange Cat Studies was developed as a final academic graduation project. It demonstrates advanced technical implementation through the integration of real-time authentication, dynamic question management, automatic data extraction from unstructured PDF files, and a user-centric interface inspired by educational gamification principles.
