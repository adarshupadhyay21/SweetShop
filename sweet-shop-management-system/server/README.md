# Sweet Shop Management System - Server Documentation

## Overview
The Sweet Shop Management System is a full-stack application designed to manage sweets in a shop. This document provides setup instructions and API usage guidelines for the backend server.

## Prerequisites
- Node.js (version 14 or higher)
- MongoDB (for database)
- npm (Node Package Manager)

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd sweet-shop-management-system/server
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file in the `server` directory based on the `.env.example` file. Update the variables with your configuration, such as database connection strings.

4. **Run the Server**
   ```bash
   npm start
   ```
   The server will start on the specified port (default is 5000).

## API Endpoints

### Sweets

- **GET /api/sweets**
  - Description: Retrieve all sweets.
  
- **POST /api/sweets**
  - Description: Add a new sweet.
  - Body: `{ "name": "Sweet Name", "category": "Category", "price": Number, "quantity": Number }`

- **GET /api/sweets/:id**
  - Description: Retrieve a sweet by ID.

- **PUT /api/sweets/:id**
  - Description: Update a sweet by ID.
  - Body: `{ "name": "Updated Name", "category": "Updated Category", "price": Number, "quantity": Number }`

- **DELETE /api/sweets/:id**
  - Description: Delete a sweet by ID.

## Testing
To run tests for the API, navigate to the `tests` directory and run:
```bash
npm test
```

## License
This project is licensed under the MIT License. See the LICENSE file for details.