import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import DashboardNew from "./pages/DashboardNew";
import Applications from "./pages/Applications";
import AddJob from "./pages/AddJob";
import ProtectedRoute from "./components/ProtectedRoute";
import ViewApplication from "./pages/ViewApplication";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardNew />
          </ProtectedRoute>
        }
      />

      <Route
        path="/applications"
        element={
          <ProtectedRoute>
            <Applications />
          </ProtectedRoute>
        }
      />

      <Route
        path="/applications/new"
        element={
          <ProtectedRoute>
            <AddJob />
          </ProtectedRoute>
        }
      />

        <Route
          path="/applications/:id"
          element={
            <ProtectedRoute>
              <ViewApplication />
            </ProtectedRoute>
          }
        />

        <Route
          path="/applications/:id/edit"
          element={
            <ProtectedRoute>
              <AddJob />
            </ProtectedRoute>
          }
        />
    </Routes>
  );
}

export default App;