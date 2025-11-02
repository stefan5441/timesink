import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Home } from "./pages/Home/Home";
import { NotFound } from "./pages/Others/NotFound";
import ProtectedRoutes from "./auth/ProtectedRoutes";
import { Login } from "./pages/Authentication/Login";
import { Statistics } from "./pages/Statistics/Statistics";
import { TimerProvider } from "./contexts/TimerContext/TimeProvider";
import { ThemeProvider } from "./contexts/ThemeContext/ThemeProvider";
import { RecordActivity } from "./pages/RecordActivity/RecordActivity";
import { ManageActivities } from "./pages/ManageActivities/ManageActivities";

const queryClient = new QueryClient();

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <TimerProvider>
              <Routes>
                <Route index element={<Home />} />
                <Route path="login" element={<Login />} />

                <Route element={<ProtectedRoutes />}>
                  <Route path="record-activity" element={<RecordActivity />} />
                  <Route path="manage-activities" element={<ManageActivities />} />
                  <Route path="stats" element={<Statistics />} />
                </Route>

                <Route path="*" element={<NotFound />} />
              </Routes>
            </TimerProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
