import "./App.css";
import { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AuthContext from "./context/AuthProvider";

import HOME from "./pages/Home";
import Admin from "./pages/Admin";
import UserManagement from "./pages/UserManagement";
import ErrorPage from "./pages/ErrorPage";

function App() {
  const { auth } = useContext(AuthContext);

  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/UserManagement">User Management</Link>
        <Link to="/admin">Admin</Link>
      </nav>
      <Routes>
        <Route path="/" element={<HOME />} />

        <Route
          path="/UserManagement"
          element={auth.isAuthorized ? <UserManagement /> : <HOME />}
        />

        <Route
          path="/admin"
          element={auth.isAuthorized ? <Admin /> : <HOME />}
        />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
