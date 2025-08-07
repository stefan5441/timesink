import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RequireAuth from "./auth/RequreAuth";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route
        path="/*"
        element={
          <RequireAuth>
            <Routes>
              <Route path="protectedroute" element={<ProtectedRoute />} />
            </Routes>
          </RequireAuth>
        }
      />
    </Routes>
  );
}

export default App;
