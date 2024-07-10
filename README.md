# Library Management System

This Library Management System is a web application designed to manage book issue and returns in a library. It uses a React frontend and a Node.js backend, with JWT for authentication, and Chakra UI for styling.
## Features
- **Authentication**:
Secure login and registration using JWT.
- **Book Management**: Admin can add, edit, and delete books.
- **Issue Books**: Admin can issue books to students, and the details are saved in the database and new student will register.
- **Student Login**: students can login with their email that they give while issuing book and the password will be their name+123
- **Return Books**: Admin can return books using a modal that requires a secret key.
- **Book Holders**: View all the students who have issued books, along with their details.

## Getting Started
### Prerequisites
- Node.js and npm installed

### Installation

1. **Clone the repository**
    ```sh
    git clone https://github.com/farhanoxg/lms-frontend.git
    ```
2. **Install dependencies**
    ```sh
    cd lms-frontend 
    npm install
    ```
3. **Start frontend server**
    ```sh
    cd lms-frontend 
    npm run dev
    ```
## Contributions

Contributions are welcome! Please fork the repository and create a pull request with your changes.
