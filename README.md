# Task Manager

A full-stack MERN (MongoDB, Express, React, Node.js) task management application with user authentication and task tracking features.

## Features

- 🔐 User Authentication (Sign Up / Sign In)
- ✅ Create, Read, Update, Delete Tasks
- 📋 Scrum Board View
- 🎯 Task Status Management
- 🔒 Protected Routes
- 🎨 Modern UI with Tailwind CSS
- 📱 Responsive Design

## Tech Stack

### Frontend

- React 19
- Vite
- React Router DOM
- Tailwind CSS 4
- Radix UI Components
- React Hook Form
- Axios
- Sonner (Toast Notifications)

### Backend

- Node.js
- Express 5
- MongoDB with Mongoose
- JWT Authentication
- Bcrypt (Password Hashing)
- Cloudinary (File Upload)
- Cookie Parser
- CORS

## Project Structure

```
Task-Manager/
├── Backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   ├── utils/
│   │   ├── db/
│   │   ├── app.js
│   │   └── index.js
│   └── package.json
│
└── Frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── context/
    │   ├── services/
    │   └── App.jsx
    └── package.json
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone <your-repo-url>
cd Task-Manager
```

2. Install Backend dependencies

```bash
cd Backend
npm install
```

3. Install Frontend dependencies

```bash
cd ../Frontend
npm install
```

### Environment Variables

#### Backend (.env)

Create a `.env` file in the Backend directory:

```env
PORT=8000
MONGODB_URI=your_mongodb_connection_string
CORS_ORIGIN=http://localhost:5173
ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=10d
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

#### Frontend (.env)

Create a `.env` file in the Frontend directory:

```env
VITE_API_URL=http://localhost:8000/api/v1
```

### Running the Application

1. Start the Backend server

```bash
cd Backend
npm run dev
```

2. Start the Frontend development server

```bash
cd Frontend
npm run dev
```

The application will be available at:

- Frontend: http://localhost:5173
- Backend: http://localhost:8000

## API Endpoints

### Authentication

- `POST /api/v1/users/register` - Register a new user
- `POST /api/v1/users/login` - Login user
- `POST /api/v1/users/logout` - Logout user
- `GET /api/v1/users/current-user` - Get current user

### Tasks

- `GET /api/v1/tasks` - Get all tasks
- `POST /api/v1/tasks` - Create a new task
- `GET /api/v1/tasks/:id` - Get task by ID
- `PATCH /api/v1/tasks/:id` - Update task
- `DELETE /api/v1/tasks/:id` - Delete task

## Scripts

### Backend

- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

### Frontend

- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Author

Shah Iman Ali

## Acknowledgments

- Built with ❤️ using the MERN stack
- UI components from Radix UI
- Styling with Tailwind CSS
