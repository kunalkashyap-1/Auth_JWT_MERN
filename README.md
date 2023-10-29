# User Authentication API

This is a user authentication and registration web application built using Node.js and Express.js. It provides routes for user login, registration, and access to protected data. The application uses JSON Web Tokens (JWT) for authentication and MongoDB with Mongoose for data storage.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Usage](#usage)
  - [User Authentication](#user-authentication)
  - [User Registration](#user-registration)
  - [Accessing Protected Data](#accessing-protected-data)
- [Code Structure](#code-structure)
- [Dependencies](#dependencies)


## Getting Started

### Prerequisites

To run this application, you need to have the following software installed on your system:

- Node.js
- MongoDB (and a running MongoDB instance)
- An editor of your choice (e.g., Visual Studio Code)

### Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/yourusername/your-repo.git```

2. Change into the project directory:
```
cd your-repo```

3. Install the required dependencies:
```
npm install```

### Configuration

- Create a `.env` file in the root directory of the project adn define the following environment variables:

```
PORT=3000 # Port on which the server will run
MONGO_URI=your-mongodb-connection-string # MongoDB connection string
JWT_SECRET=your-secret-key # Secret key for JWT token generation 
```

## Usage

#### User Authentication

o authenticate a user, send a POST request to the /api/user/login endpoint with the user's email and password. If the login is successful, you'll receive a JSON response containing a user token and user details.

#### User Registration

To register a new user, send a POST request to the /api/user/register endpoint with the user's name, email, and password. If registration is successful, you'll receive a JSON response containing a user token and user details.

#### Accessing Protected Data

To access protected data, send a GET request to the /api/user/protected endpoint. This route is protected by JWT authentication, and you must include a valid token in the request header to access the data.

### Code Structure

The code is organized into the following components:

- models/userModel.js: Defines the User model schema and includes password hashing functionality.
- middleware/auth.js: Contains the middleware for protecting routes using JWT.
- configs/genToken.js: Handles JWT token generation.
- routes/userRoutes.js: Defines user authentication, registration, and protected data routes.
- index.js: Sets up the Express application, connects to the database, and starts the server.

### Dependencies
This project relies on the following dependencies:

- Express.js: For building the web application.
- MongoDB with Mongoose: For data storage.
- JSON Web Tokens (JWT): For user authentication.
- Bcrypt: For password hashing.
- dotenv: For loading environment variables.

