import "./App.css";
import { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HOME from "./pages/Home";
import ADMIN from "./pages/Admin";
import ErrorPage from "./pages/ErrorPage";
import AuthContext from "./context/AuthProvider";

function App() {
  const { auth } = useContext(AuthContext);

  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/admin">Admin</Link>
      </nav>
      <Routes>
        <Route path="/" element={<HOME />} />

        <Route
          path="/admin"
          element={auth.isAuthorized ? <ADMIN /> : <HOME />}
        />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
