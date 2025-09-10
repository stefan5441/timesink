import { Route, Routes } from "react-router-dom";

import { Home } from "./pages/Home/Home";
import { NotFound } from "./pages/Others/NotFound";
import ProtectedRoutes from "./auth/ProtectedRoutes";
import { Login } from "./pages/Authentication/Login";
import { Signup } from "./pages/Authentication/Signup";
import { ProtectedRoute } from "./pages/Others/ProtectedRoute";
import { RecordActivity } from "./pages/RecordActivity/RecordActivity";
import { ManageActivities } from "./pages/ManageActivities/ManageActivities";

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />

      <Route element={<ProtectedRoutes />}>
        <Route path="protected" element={<ProtectedRoute />} />
        <Route path="manage-activities" element={<ManageActivities />} />
        <Route path="record-activity" element={<RecordActivity />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
