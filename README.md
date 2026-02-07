### Mini Task Manager – Full Stack Project

Mini full-stack task manager application with user authentication and task management.

This project was developed as a technical assessment, focusing on clean architecture, API communication, state management, and good UI/UX practices.
## Tech Stack
- Backend: PHP (Phalcon Framework) + JWT
- Frontend: React + Redux Toolkit
- Database: MySQL
- Authentication: JSON Web Tokens (JWT)


## Features

- User registration and login
- JWT-based authentication
- Protected routes
- Create, read, update, delete tasks
- Task filtering by status
- Inline task editing
- Responsive UI
- Visual feedback messages
- Automatic logout on token expiration

## Requirements
- PHP 8.0+
- Composer
- MySQL 8+
- Node.js 18+
- npm or yarn

## Project Structure

/
├── backend
│   ├── app
│   ├── routes
│   ├── config
│   ├── database
│   └── public
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
└── README.md

### Setup & Execution

##  1. Database Stup

Create database:
CREATE DATABASE task_manager;
Import schema:
mysql -u root -p task_manager < backend/database/schema.sql


## 2. Backend setup

Navigate to backend folder:
cd backend

install dependecies:
composer install

configure database and JWT SETTINGS IN:
    backend/config/config.php
use password is your MySQL password

#  Run Backend
    php -S localhost:8000 -t public

backend will be available at:
    php -S localhost:8000 -t public


## 3. Frontend setup

npm install

# Configure Api Base URL in:
    src/api/axios.js

    example:

    baseURL: "http://localhost:8000:api"
# Start development server:
    npm run dev

🔐 Authentication Flow

Users register and login via public endpoints.

Backend returns a JWT on successful login.

Frontend stores the token in localStorage.

Token is automatically attached to API requests.

Protected routes require a valid token.

Users are logged out automatically when the token expires.

🧠 Technical Considerations

Clear separation between frontend and backend

Centralized state management with Redux Toolkit

Secure API communication using JWT

Reusable components and clean structure

Responsive design and user-friendly interface

👨‍💻 Author

Luis Miguel
Electronic Engineer
Full Stack Developer (Junior)