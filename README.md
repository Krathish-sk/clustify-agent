# Clustify Agent - Full-Stack Website

A modern, responsive web application built with React.js (JSX) and Node.js, featuring AI agent functionality with file uploads and dark/light theme support.

## Features

- **Modern React.js Frontend** (using JSX, not TypeScript)
- **User Authentication** (Login/Register)
- **User Profile Management**
- **AI Agent Interface** with prompt input and file attachments
- **Dark/Light Theme Toggle**
- **Responsive Design**
- **Node.js Backend API**
- **MongoDB Database Integration**
- **File Upload Support**
- **JWT Authentication**

## Tech Stack

### Frontend

- React.js (JSX)
- React Router DOM
- Tailwind CSS
- Lucide React (icons)
- Context API for state management

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Multer (file uploads)
- bcryptjs (password hashing)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Frontend Setup

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

### Backend Setup

1. Navigate to the server directory:

```bash
cd server
```

2. Install backend dependencies:

```bash
npm install
```

3. Create environment file:

```bash
cp .env.example .env
```

4. Update the `.env` file with your MongoDB connection string and JWT secret:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/clustify-agent
JWT_SECRET=your-super-secret-jwt-key-here
```

5. Create uploads directory:

```bash
mkdir uploads
```

6. Start the backend server:

```bash
npm run dev
```

The backend will run on `https://clustifyagent-backend.onrender.com`

## MongoDB Setup

### Local MongoDB

1. Install MongoDB Community Edition
2. Start MongoDB service
3. The app will connect to `mongodb://localhost:27017/clustify-agent`

### MongoDB Atlas (Cloud)

1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get your connection string
4. Update `MONGODB_URI` in your `.env` file

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### User

- `GET /api/user/profile` - Get user profile (protected)

### Prompts

- `POST /api/prompts` - Submit prompt with files (protected)
- `GET /api/prompts` - Get user's prompts (protected)

### Health Check

- `GET /api/health` - Server health check

## Demo Account

For testing purposes, use these credentials:

- **Email:** demo@clustify.com
- **Password:** demo123

## Project Structure

```
├── src/
│   ├── components/
│   │   └── Header.jsx
│   ├── contexts/
│   │   ├── AuthContext.jsx
│   │   └── ThemeContext.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── Profile.jsx
│   ├── App.jsx
│   └── main.jsx
├── server/
│   ├── server.js
│   ├── package.json
│   └── .env.example
└── README.md
```

## Features Implemented

### Frontend (JSX)

- ✅ Modern React components using JSX
- ✅ Context API for theme and authentication
- ✅ Responsive design with Tailwind CSS
- ✅ Dark/Light theme toggle
- ✅ Protected routes
- ✅ File upload interface
- ✅ Form validation and error handling

### Backend (Node.js)

- ✅ Express.js REST API
- ✅ MongoDB integration with Mongoose
- ✅ JWT authentication
- ✅ File upload with Multer
- ✅ Password hashing with bcryptjs
- ✅ CORS configuration
- ✅ Error handling middleware

## Deployment

### Frontend Deployment

The frontend is configured for deployment on platforms like Netlify, Vercel, or any static hosting service.

### Backend Deployment

The backend can be deployed on platforms like:

- Heroku
- Railway
- DigitalOcean App Platform
- AWS EC2
- Google Cloud Platform

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
