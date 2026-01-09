import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import CommonLayout from "./components/common-layout/CommonLayout";
import AuthPage from "./pages/auth/Auth.jsx";
import Tasks from "./pages/tasks/Tasks";
import ScrumBoard from "./pages/scrum-board/ScrumBoard";
import SignIn from "./components/auth/Sign-In/SignIn.jsx";
import SignUp from "./components/auth/Sign-Up/SignUp.jsx";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { PublicRoute } from "./components/PublicRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signin" replace />} />

      {/* Public Routes - redirect to /tasks/list if already authenticated */}
      <Route
        path="/auth"
        element={
          <PublicRoute>
            <AuthPage />
          </PublicRoute>
        }
      />
      <Route
        path="/signin"
        element={
          <PublicRoute>
            <SignIn />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <SignUp />
          </PublicRoute>
        }
      />

      {/* Protected Routes - require authentication */}
      <Route
        path="/tasks"
        element={
          <ProtectedRoute>
            <CommonLayout />
          </ProtectedRoute>
        }
      >
        <Route path="list" element={<Tasks />} />
        <Route path="scrum-board" element={<ScrumBoard />} />
      </Route>
    </Routes>
  );
}

export default App;
