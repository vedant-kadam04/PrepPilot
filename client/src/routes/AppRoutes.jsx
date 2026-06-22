import {  Routes, Route } from "react-router-dom";

import Login from "../pages/Login"
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Report from "../pages/Report";
import Interview from "../pages/Interview";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";

function App() {
  return (
  
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/register" element={<Register />} />

    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }
    />

    <Route
      path="/interview/:id"
      element={
        <ProtectedRoute>
          <Interview />
        </ProtectedRoute>
      }
    />

    <Route
      path="/report/:id"
      element={
        <ProtectedRoute>
          <Report />
        </ProtectedRoute>
      }
    />
  </Routes>

  );
}

export default App;