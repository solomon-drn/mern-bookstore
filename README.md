# 📚 MERN Bookstore

A full-stack bookstore management application built with the **MERN stack**. The application provides a React frontend for managing books through a RESTful API built with Node.js and Express, with MongoDB used for data storage.

This project was built as a hands-on full-stack development project to strengthen my understanding of building, connecting, authenticating, and deploying a modern web application.

## 🌐 Live Demo

**Live Application:**
https://mern-bookstore-phi.vercel.app/

✨ Features

### 📖 Book Management

* View all books
* View individual book details
* Create new books
* Edit existing books
* Delete books
* Display book creation and update timestamps
* Delete confirmation dialog
* Loading and error states
* Toast notifications for successful operations

### 🔐 Authentication

* User login
* Password hashing with `bcrypt`
* JWT-based authentication
* Persistent authentication using `localStorage`
* Protected frontend routes
* Public and protected route handling
* Protected backend endpoints
* Automatic JWT attachment using an Axios request interceptor
* Current-user authentication on application startup
* Logout functionality

### 🎨 User Interface

* Responsive React interface
* Tailwind CSS styling
* Reusable UI components
* Loading spinner
* Toast notifications
* Error handling
* Confirmation dialogs
* Accessible form labels and inputs
* Browser autofill support

## 🛠️ Tech Stack

### Frontend

* **React**
* **React Router**
* **Axios**
* **Tailwind CSS**
* **Vite**

### Backend

* **Node.js**
* **Express.js**
* **MongoDB**
* **Mongoose**
* **JSON Web Tokens (JWT)**
* **bcrypt**
* **dotenv**
* **CORS**

### Deployment

* **Vercel** — Frontend
* **Render** — Backend
* **MongoDB Atlas** — Database

### Development Tools

* **Git**
* **GitHub**
* **VS Code**
* **Nodemon**

## 🏗️ Project Structure

```text
mern-bookstore/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── config.js
│   ├── app.js
│   └── index.js
│
├── frontend/
│   └── src/
│       ├── components/
│       ├── context/
│       ├── pages/
│       ├── api.js
│       ├── App.jsx
│       └── main.jsx
│
└── README.md
```

The application separates the frontend and backend into independent applications. The React frontend communicates with the Express backend through RESTful API endpoints.

## 🔄 Application Architecture

```text
                    🌐 User
                       │
                       ▼
          ┌──────────────────────┐
          │      Vercel          │
          │   React + Vite       │
          │    Tailwind CSS      │
          └──────────┬───────────┘
                     │
                     │ HTTPS / Axios
                     ▼
          ┌──────────────────────┐
          │       Render         │
          │    Node + Express    │
          │    JWT Auth          │
          └──────────┬───────────┘
                     │
                     │ Mongoose
                     ▼
          ┌──────────────────────┐
          │    MongoDB Atlas     │
          │       Database       │
          └──────────────────────┘
```

## 🔐 Authentication Flow

Authentication is implemented using **JSON Web Tokens (JWT)**.

### Login

```text
User
 ↓
Login form
 ↓
POST /api/v1/auth/login
 ↓
Backend validates credentials
 ↓
JWT generated
 ↓
JWT returned to frontend
 ↓
Token stored in localStorage
```

### Authenticated Requests

The frontend uses a reusable Axios instance with a request interceptor to automatically attach the JWT to protected requests.

```text
React component
       ↓
api.get() / api.post() / api.patch() / api.delete()
       ↓
Axios interceptor
       ↓
JWT retrieved from localStorage
       ↓
Authorization: Bearer <token>
       ↓
Express authentication middleware
       ↓
JWT verified
       ↓
Protected controller
```

Centralizing this logic means individual React components do not need to manually attach the JWT to every authenticated request.

## 🛡️ Protected API Routes

Book operations that modify data require authentication.

| Method   | Endpoint               | Authentication |
| -------- | ---------------------- | -------------- |
| `GET`    | `/api/v1/books`        | Public         |
| `GET`    | `/api/v1/books/:id`    | Public         |
| `POST`   | `/api/v1/books/create` | Required       |
| `PATCH`  | `/api/v1/books/:id`    | Required       |
| `DELETE` | `/api/v1/books/:id`    | Required       |

## 📡 API Endpoints

### Authentication

#### Login

```http
POST /api/v1/auth/login
```

Request body:

```json
{
  "email": "user@example.com",
  "password": "your-password"
}
```

#### Get Current User

```http
GET /api/v1/auth/me
```

Requires:

```http
Authorization: Bearer <token>
```

### Books

#### Get All Books

```http
GET /api/v1/books
```

#### Get a Single Book

```http
GET /api/v1/books/:id
```

#### Create a Book

```http
POST /api/v1/books/create
```

Request body:

```json
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "publishYear": 1925
}
```

Requires authentication.

#### Update a Book

```http
PATCH /api/v1/books/:id
```

Requires authentication.

#### Delete a Book

```http
DELETE /api/v1/books/:id
```

Requires authentication.

## ⚙️ Getting Started

### Prerequisites

Make sure you have the following installed:

* [Node.js](https://nodejs.org/)
* npm
* MongoDB or a MongoDB Atlas account
* Git

### 1. Clone the repository

```bash
git clone https://github.com/solomon-drn/mern-bookstore.git
cd mern-bookstore
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` directory:

```env
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend development server:

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:4000
```

### 3. Set up the frontend

Open a new terminal:

```bash
cd frontend
npm install
```

Create a `.env` file inside the `frontend` directory:

```env
VITE_API_URL=http://localhost:4000/api/v1
```

Start the frontend development server:

```bash
npm run dev
```

Vite will provide the local development URL in the terminal.

## 🔑 Environment Variables

### Backend

| Variable      | Description                         |
| ------------- | ----------------------------------- |
| `PORT`        | Port used by the Express server     |
| `MONGODB_URI` | MongoDB connection string           |
| `JWT_SECRET`  | Secret used to sign and verify JWTs |

### Frontend

| Variable       | Description                 |
| -------------- | --------------------------- |
| `VITE_API_URL` | Base URL of the backend API |

For production, the frontend uses the deployed Render API as its base URL.

## 🚀 Deployment

The application is deployed as two separate services.

### Frontend

The React/Vite frontend is deployed on **Vercel**.

**Live Application:**
https://mern-bookstore-phi.vercel.app/

### Backend

The Node.js/Express API is deployed on **Render**.

The backend provides the RESTful API consumed by the React frontend.

### Database

The application uses **MongoDB Atlas** for cloud database hosting.

The production architecture is:

```text
Vercel
  │
  │ HTTPS
  ▼
Render
  │
  │ Mongoose
  ▼
MongoDB Atlas
```

## 🧠 What I Learned

Building and deploying this project helped me develop a stronger understanding of full-stack application development, including:

* Building RESTful APIs with Express
* Structuring backend applications using routes, controllers, models, and middleware
* Connecting Node.js applications to MongoDB using Mongoose
* Designing and validating Mongoose schemas
* Implementing CRUD operations
* Password hashing with bcrypt
* JWT authentication
* Authentication middleware
* Protected React routes
* React Context for global authentication state
* Axios instances and request interceptors
* Environment-based API configuration
* Handling asynchronous API requests
* Error handling and middleware
* Deploying a full-stack application
* Configuring environment variables for production
* Connecting independently deployed frontend and backend services

## 🚧 Future Improvements

* [ ] Add user registration
* [ ] Associate books with the users who created them
* [ ] Implement user-based authorization so users can only modify their own books
* [ ] Add book search and filtering
* [ ] Add pagination
* [ ] Add book categories and genres
* [ ] Add book cover images
* [ ] Add user profile management
* [ ] Add password reset functionality
* [ ] Add automated testing
* [ ] Add API documentation
* [ ] Improve production security and validation


## 📄 License

This project was created as a learning and portfolio project.

## 👨🏾‍💻 Author

**Solomon**

Computer Science student and full-stack developer.
