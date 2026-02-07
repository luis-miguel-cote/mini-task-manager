# 📘 `backend/README.md`

```md
# 🔧 Backend – Mini Task Manager API

This is the backend API for the **Mini Task Manager** project.  
It is built with **PHP (Phalcon Framework)** and uses **JWT** for authentication.

---

## 🛠 Tech Stack

- PHP **8+**
- Phalcon Framework
- MySQL
- Firebase PHP-JWT

---

## ✨ Features

- User registration and login
- JWT-based authentication
- Middleware for route protection
- Task CRUD operations
- Task ownership validation
- Input validation and proper HTTP responses

---

## 📦 Requirements

- PHP **8.0+**
- Composer
- MySQL **8+**

---

## Database
This project uses MySQL as the relational database.
## API Endpoints

POST   /api/register
POST   /api/login
GET    /api/tasks?user_id=1&status=pending
POST   /api/tasks
PUT    /api/tasks/{id}
DELETE /api/tasks/{id}

