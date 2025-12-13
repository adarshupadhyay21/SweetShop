# Sweet Shop Management System - Client README

# Sweet Shop Management System - Client

This is the client-side application for the Sweet Shop Management System, built using React. This application allows users to interact with the backend API to manage sweets, including adding, updating, and viewing sweet details.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)
- [Folder Structure](#folder-structure)

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the client directory:
   ```
   cd sweet-shop-management-system/client
   ```

3. Install the dependencies:
   ```
   npm install
   ```

## Usage

To start the development server, run:
```
npm start
```
This will start the application on `http://localhost:3000`.

## Scripts

- `npm start`: Starts the development server.
- `npm run build`: Builds the app for production to the `build` folder.
- `npm test`: Runs the test suite.

## Folder Structure

```
client
├── public
│   └── index.html
├── src
│   ├── api
│   │   └── api.js
│   ├── components
│   │   ├── Header.js
│   │   ├── Footer.js
│   │   ├── SweetList.js
│   │   └── SweetForm.js
│   ├── hooks
│   │   └── useSweets.js
│   ├── pages
│   │   ├── Dashboard.js
│   │   └── SweetDetails.js
│   ├── styles
│   │   └── main.css
│   └── index.js
```

This structure contains the main application files, including components, pages, and styles. The `api.js` file handles API calls to the backend.

## Contributing

Feel free to submit issues or pull requests for any improvements or bug fixes.