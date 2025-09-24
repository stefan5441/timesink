import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Home } from "./pages/Home/Home";
import { NotFound } from "./pages/Others/NotFound";
import ProtectedRoutes from "./auth/ProtectedRoutes";
import { Login } from "./pages/Authentication/Login";
import { Statistics } from "./pages/Statistics/Statistics";
import { Activities } from "./pages/Activities/Activities";
import { TimerProvider } from "./contexts/TimerContext/TimeProvider";

const queryClient = new QueryClient();

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <TimerProvider>
            <Routes>
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />

              {/* Protected routes */}
              <Route element={<ProtectedRoutes />}>
                <Route path="activities" element={<Activities />} />
                <Route path="stats" element={<Statistics />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </TimerProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
