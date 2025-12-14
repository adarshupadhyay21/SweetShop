# 🍭 Sweet Shop Management System

<div align="center">

![Sweet Shop Banner](https://img.shields.io/badge/Sweet_Shop-Management_System-FF69B4?style=for-the-badge\&logo=cookie\&logoColor=white)

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square\&logo=nodedotjs\&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square\&logo=typescript\&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-61DAFB?style=flat-square\&logo=react\&logoColor=black)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square\&logo=mongodb\&logoColor=white)](https://www.mongodb.com/)
[![Jest](https://img.shields.io/badge/Jest-C21325?style=flat-square\&logo=jest\&logoColor=white)](https://jestjs.io/)

**A full‑stack, production‑ready Sweet Shop Management System built with modern web technologies and comprehensive test coverage.**

[Features](#-features) • [Architecture](#-architecture) • [Installation](#-installation) • [API](#-api-documentation) • [Testing](#-testing)

</div>

---

## 📖 Overview

The **Sweet Shop Management System** is a full‑stack web application designed to manage a digital sweet shop’s inventory, users, and purchases. The project follows **Test‑Driven Development (TDD)** principles and applies **SOLID design patterns**, demonstrating real‑world backend and frontend engineering practices.

It is suitable as:

* A portfolio‑ready full‑stack project
* A TDD and REST API reference implementation
* A scalable base for an e‑commerce‑style application

---

## ✨ Features

### 🔐 Authentication & Authorization

* User registration and login using **JWT authentication**
* Secure password hashing with **bcrypt**
* **Role‑based access control** (Admin / User)
* Protected routes and APIs

### 🍬 Sweet Management

* View all available sweets with details
* Search and filter by name, category, and price
* Real‑time inventory quantity updates
* Purchase flow with automatic stock reduction
* Out‑of‑stock handling

### 👨‍💼 Admin Capabilities

* Add new sweets
* Update sweet details (price, description, quantity)
* Delete sweets from inventory
* Restock management

### 🎨 User Experience

* Responsive UI (desktop, tablet, mobile)
* Clean and intuitive design
* Loading states and graceful error handling
* Disabled actions for unavailable items

---

## 🛠️ Tech Stack

### Backend

* **Runtime:** Node.js (v18+)
* **Framework:** Express.js
* **Language:** TypeScript
* **Database:** MongoDB
* **ODM:** Mongoose
* **Authentication:** JWT (jsonwebtoken)
* **Password Hashing:** bcrypt
* **Validation:** express-validator
* **Testing:** Jest, Supertest

### Frontend

* **Framework:** React 18
* **Styling:** Tailwind CSS
* **Routing:** React Router v6
* **HTTP Client:** Axios
* **State Management:** React Context API
* **Icons:** Lucide React

### Development & Tooling

* Git & GitHub
* ESLint & Prettier
* Postman (API collection included)

---

## 🧱 Architecture

The application follows a clean and scalable layered architecture:

```
client (React)
   ↓
API Layer (Express Routes)
   ↓
Controller Layer
   ↓
Service Layer (Business Logic)
   ↓
Repository Layer (Database Access)
   ↓
MongoDB
```

### Design Patterns Used

* Repository Pattern
* Service Layer Pattern
* Middleware Pattern
* Dependency Injection (logical separation)
* Factory Pattern (test data)

---

## 🚀 Installation

### Prerequisites

* Node.js v18+
* MongoDB (local or Atlas)
* npm or yarn
* Git

---

### 🔧 Backend Setup

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/sweet-shop-management.git
cd sweet-shop-management/backend
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

```bash
cp .env.example .env
```

Example `.env`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/sweet-shop
JWT_SECRET=your_jwt_secret
```

4. **Start the server**

```bash
npm run dev
```

Backend will run at:

```
http://localhost:5000
```

---

### 🎨 Frontend Setup

1. **Navigate to frontend directory**

```bash
cd ../frontend
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

```bash
cp .env.example .env
```

```env
REACT_APP_API_URL=http://localhost:5000/api
```

4. **Start the frontend**

```bash
npm start
```

Frontend will run at:

```
http://localhost:3000
```

---

## 🧪 Testing

### Backend Tests

```bash
npm test
npm run test:watch
npm run test:coverage
```

### Frontend Tests

```bash
npm test
npm run test:coverage
```

Testing includes:

* Unit tests for services
* Integration tests for APIs
* Authentication & authorization scenarios

---

## 📚 API Documentation

### Base URL

```
/api
```

### Common Status Codes

* `200 OK`
* `201 Created`
* `400 Bad Request`
* `401 Unauthorized`
* `403 Forbidden`
* `404 Not Found`
* `409 Conflict`
* `500 Internal Server Error`

Postman collection is included for full endpoint testing.

---

## 🤖 AI Usage & Transparency

AI tools were used responsibly to enhance productivity while maintaining full understanding and ownership of the code.

### Tools Used

* **ChatGPT (OpenAI):** Architecture planning, debugging, best‑practice discussions
* **GitHub Copilot:** Boilerplate generation and code completion
* **Claude (Anthropic):** README and documentation refinement

### Best Practices Followed

* All AI‑generated code reviewed and tested
* No blind copy‑paste into production code
* Critical business logic written manually
* Clear commit messages with AI attribution where applicable

---

## 🔮 Future Enhancements

* Shopping cart functionality
* Order history & tracking
* Payment gateway integration (Stripe / PayPal)
* Email alerts for low stock
* Reviews & ratings
* Admin analytics dashboard
* WebSocket‑based real‑time inventory updates
* Dark mode
* Export reports (CSV / PDF)

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 🙏 Acknowledgments

* Open‑source community
* Anthropic Claude
* GitHub Copilot
* OpenAI ChatGPT

---

<div align="center">

**Built with ❤️ using modern web technologies and AI‑assisted development**

</div>
