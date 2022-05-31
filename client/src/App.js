import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import { useContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AuthContext from "./context/AuthProvider";

import HOME from "./pages/Home";
import Admin from "./pages/Admin";
import UserManagement from "./pages/UserManagement";
import ErrorPage from "./pages/ErrorPage";
import NavBar from "./components/NavBar";
import AllUseres from "./pages/AllUseres";
import EditUser from "./pages/EditUser";
import CreateUser from "./pages/CreateUser";

function App() {
  const { auth } = useContext(AuthContext);

  return (
    <Router>
      <NavBar />

      <Routes>
        <Route path="/" element={<HOME />} />

        <Route
          path="/UserManagement"
          element={auth.isAuthorized ? <UserManagement /> : <HOME />}
        />

        <Route
          path="/allUsers"
          element={auth.isAuthorized ? <AllUseres /> : <HOME />}
        />
        <Route
          path="/createUser"
          element={auth.isAuthorized ? <CreateUser /> : <HOME />}
        />
        <Route
          path="/editUser"
          element={auth.isAuthorized ? <EditUser /> : <HOME />}
        />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
    //-----------------------------------------------------------

    // <Router>
    //   <nav>
    //     <Link to="/">Home | </Link>
    //     <Link to="/UserManagement"> User Management | </Link>
    //     {auth.groups?.includes("admin") && <Link to="/admin">Admin</Link>}
    //   </nav>

    //   <hr />
    //   <br />

    //   <Routes>
    //     <Route path="/" element={<HOME />} />

    //     <Route
    //       path="/UserManagement"
    //       element={auth.isAuthorized ? <UserManagement /> : <HOME />}
    //     />

    //     <Route
    //       path="/admin"
    //       element={auth.isAuthorized ? <Admin /> : <HOME />}
    //     />

    //     <Route path="*" element={<ErrorPage />} />
    //   </Routes>
    // </Router>
  );
}

export default App;
