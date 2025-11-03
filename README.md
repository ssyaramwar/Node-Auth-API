# 🔒 Node.js Authentication & Authorization API (Express, MongoDB, JWT)

A robust backend API demonstrating secure user management, password hashing, and role-based access control (RBAC) using JSON Web Tokens.

---

## ✨ Features

* **User Registration (`/signup`):** Securely creates new users with password hashing via `bcrypt`.
* **User Login (`/login`):** Validates credentials, generates a time-bound JWT, and sets an HTTP-only cookie.
* **Authentication Middleware (`auth`):** Verifies the JWT for access to protected routes.
* **Role-Based Access Control (RBAC):** Separate middleware (`isStudent`, `isAdmin`) restricts access based on the user's role defined in the token payload.
* **Technology Stack:** Built with Node.js, Express, MongoDB (via Mongoose), and `dotenv` for configuration.

---

## 🛠️ Tech Stack

* **Runtime:** Node.js
* **Framework:** Express
* **Database:** MongoDB (using Mongoose ODM)
* **Authentication:** JSON Web Tokens (JWT)
* **Security:** `bcrypt` for password hashing
* **Environment:** `dotenv`

---

## 🚀 Getting Started

### Prerequisites

You need to have Node.js and npm installed, along with access to a MongoDB instance (local or remote via MongoDB Atlas).

### Installation

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/ssyaramwar/Node-Auth-API
    cd Node-Auth-API
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a file named **`.env`** in the root directory and add the following variables:

    ```
    # MongoDB Connection String (Replace with your actual URL)
    MONGODB_URL="mongodb+srv://user:password@clustername/dbname"
    password:************

    # Secret Key for JWT Signing (Must be a long, random, secure string)
    JWT_SECRET="YOUR_VERY_SECURE_JWT_SECRET_KEY_HERE"
    
    # Port for the server to run on
    PORT=4000
    ```

### Running the Server

Start the server using `nodemon` (assuming it's installed as a dev dependency):

```bash
npm run dev 
