# Shhh! Garfield is studying!

Shhh! Garfield is studying! is a study assistant designed for public service exam candidates. The platform provides a daily set of 10 math and logical reasoning questions. Upon completing the daily questions, users unlock a Garfield comic strip as a reward, creating an engaging and motivating study experience. The application also includes performance tracking features and a personalized sticker album with collected comics.

---

## Features

- Manual registration of exam syllabi, requiring only the exam board and level.
- PDF upload for automatic extraction of questions and topics.
- Daily quiz with 10 randomly selected math and logical reasoning questions.
- Feedback on incorrect answers, showing only the topic to review.
- Option to save questions for future revision in a personalized "Review List."
- Garfield comic strips as daily rewards, displayed in a calendar-based sticker album.
- Performance reports and graphical analysis of weekly and monthly progress.
- Firebase authentication for secure user access.

---

## Technologies Used

- **Frontend:** React.js  
- **Backend:** Node.js  
- **Database:** 
  - MongoDB for storing collected Garfield comics.
  - (Under evaluation) MySQL, PostgreSQL, or MongoDB for question storage.
- **Authentication:** Firebase  
- **API:** Integration with an external website providing Garfield comics based on dates.

---

## Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

- Node.js and npm installed on your machine.
- Git installed for version control.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/purrfect-studies.git
   cd purrfect-studies
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The application will run at `http://localhost:3000`.

---

## Project Structure

```
/purrfect-studies
│
├── /public
├── /src
│   ├── /components
│   ├── /pages
│   ├── /services
│   ├── /styles
│   └── App.js
├── .env
├── package.json
└── README.md
```

---
