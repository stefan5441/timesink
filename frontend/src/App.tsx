import { Route, Routes } from "react-router-dom";

import { Home } from "./pages/Home/Home";
import { NotFound } from "./pages/Others/NotFound";
import ProtectedRoutes from "./auth/ProtectedRoutes";
import { Login } from "./pages/Authentication/Login";
import { Signup } from "./pages/Authentication/Signup";
import { Activities } from "./pages/Activities/Activities";
import { TimerProvider } from "./contexts/timer/TimeProvider";
import { Statistics } from "./pages/Statistics/Statistics";

function App() {
  return (
    <TimerProvider>
      <Routes>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoutes />}>
          <Route path="activities" element={<Activities />} />
          <Route path="stats" element={<Statistics />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </TimerProvider>
  );
}

export default App;
