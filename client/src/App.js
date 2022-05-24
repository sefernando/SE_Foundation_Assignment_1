import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HOME from "./pages/Home";
import ADMIN from "./pages/Admin";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/admin">Admin</Link>
      </nav>
      <Routes>
        <Route path="/" element={<HOME />} />
        <Route path="/admin" element={<ADMIN />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
