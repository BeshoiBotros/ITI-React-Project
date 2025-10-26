import { Routes, Route } from "react-router-dom";
import UnAuthLayout from "./layouts/UnAuthLayout";
import AuthLayout from "./layouts/AuthLayout";
import NotFound from "./components/404";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Notes from "./pages/Notes";
import Analytics from "./pages/Analytics";
import Weather from "./pages/Weather";
import UserDetail from "./pages/UserDetail";
import Login from "./pages/login";

function App() {
  return (
    <>
      <Routes>
        <Route element={<UnAuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/users/user/:id" element={<UserDetail />} />
        </Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
}

export default App;
