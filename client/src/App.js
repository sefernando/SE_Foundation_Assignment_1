import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HOME from "./pages/Home";
import ABOUT from "./pages/About";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<HOME />} />
        <Route path="/about" element={<ABOUT />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
