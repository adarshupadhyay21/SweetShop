# Sweet Shop Management System

## Overview
The Sweet Shop Management System is a full-stack application designed to manage a sweet shop's inventory, including the ability to add, update, delete, and view sweets. The application consists of a Node.js backend API built with Express and a React frontend application.

## Features
- User authentication (token-based)
- CRUD operations for sweets
- Search functionality for sweets
- Responsive design for better user experience

## Technologies Used
- **Backend**: Node.js, Express, MongoDB
- **Frontend**: React, CSS
- **Testing**: Jest, Supertest
- **Containerization**: Docker

## Project Structure
```
sweet-shop-management-system
├── README.md
├── .gitignore
├── package.json
├── docker-compose.yml
├── .env.example
├── server
│   ├── README.md
│   ├── package.json
│   ├── src
│   │   ├── index.js
│   │   ├── app.js
│   │   ├── config
│   │   │   └── db.js
│   │   ├── routes
│   │   │   ├── index.js
│   │   │   └── sweets.js
│   │   ├── controllers
│   │   │   └── sweetsController.js
│   │   ├── models
│   │   │   └── sweet.model.js
│   │   ├── services
│   │   │   └── sweetService.js
│   │   ├── middleware
│   │   │   └── auth.js
│   │   └── utils
│   │       └── logger.js
│   └── tests
│       └── sweets.test.js
└── client
    ├── README.md
    ├── package.json
    ├── public
    │   └── index.html
    ├── src
    │   ├── index.js
    │   ├── App.js
    │   ├── api
    │   │   └── api.js
    │   ├── components
    │   │   ├── Header.js
    │   │   ├── Footer.js
    │   │   ├── SweetList.js
    │   │   └── SweetForm.js
    │   ├── pages
    │   │   ├── Dashboard.js
    │   │   └── SweetDetails.js
    │   ├── hooks
    │   │   └── useSweets.js
    │   ├── styles
    │   │   └── main.css
    │   └── tests
    │       └── App.test.js
    └── public
        └── favicon.ico
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Docker (optional, for containerization)

### Backend Setup
1. Navigate to the `server` directory:
   ```
   cd server
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file based on the `.env.example` file and configure your environment variables.
4. Start the server:
   ```
   npm start
   ```

### Frontend Setup
1. Navigate to the `client` directory:
   ```
   cd client
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the React application:
   ```
   npm start
   ```

## Usage
- Access the frontend application at `http://localhost:3000`.
- The backend API will be available at `http://localhost:5000/api`.

## Testing
- To run tests for the backend, navigate to the `server` directory and run:
  ```
  npm test
  ```
- To run tests for the frontend, navigate to the `client` directory and run:
  ```
  npm test
  ```

## Docker
To run the application using Docker, use the following command in the root directory:
```
docker-compose up
```

## License
This project is licensed under the MIT License.
