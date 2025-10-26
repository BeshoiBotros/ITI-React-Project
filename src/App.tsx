import { Routes, Route } from "react-router-dom";
import UnAuthLayout from "./layouts/UnAuthLayout";
import AuthLayout from "./layouts/AuthLayout";
import NotFound from "./components/404";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      <Routes>
        <Route element={<UnAuthLayout />}>
          <Route path="/login" />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" />
        </Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
}

export default App;
