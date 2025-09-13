import { Route, Routes } from "react-router-dom";

import { Home } from "./pages/Home/Home";
import { NotFound } from "./pages/Others/NotFound";
import ProtectedRoutes from "./auth/ProtectedRoutes";
import { Login } from "./pages/Authentication/Login";
import { Signup } from "./pages/Authentication/Signup";
import { ProtectedRoute } from "./pages/Others/ProtectedRoute";
import { Activities } from "./pages/Activities/Activities";
import { TimerProvider } from "./contexts/timer/TimeProvider";

function App() {
  return (
    <TimerProvider>
      <Routes>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="protected" element={<ProtectedRoute />} />
          <Route path="activities" element={<Activities />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </TimerProvider>
  );
}

export default App;
