import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import { useContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AuthContext from "./context/AuthProvider";

import HOME from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import NavBar from "./components/NavBar";
import EditUsers from "./pages/EditUsers";
import EditUser from "./pages/EditUser";
import CreateGroup from "./pages/CreateGroup";
import CreateUser from "./pages/CreateUser";
import ChangePassword from "./pages/ChangePassword";
import ChangeEmail from "./pages/ChangeEmail";
import Applications from "./pages/Applications";
import CreateNewApp from "./pages/CreateNewApp";
import EditApp from "./pages/EditApp";
import AddPlan from "./pages/AddPlan";

function App() {
  const { auth } = useContext(AuthContext);

  return (
    <Router>
      <NavBar />

      <Routes>
        <Route path="/" element={<HOME />} />

        <Route
          path="/editUsers"
          element={auth.isAuthorized ? <EditUsers /> : <HOME />}
        />
        <Route
          path="/createUser"
          element={auth.isAuthorized ? <CreateUser /> : <HOME />}
        />
        <Route
          path="/createGroup"
          element={auth.isAuthorized ? <CreateGroup /> : <HOME />}
        />

        <Route
          path="/editUser/:userName"
          element={auth.isAuthorized ? <EditUser /> : <HOME />}
        />

        <Route
          path="/changeEmail"
          element={auth.isAuthorized ? <ChangeEmail /> : <HOME />}
        />

        <Route
          path="/changePassword"
          element={auth.isAuthorized ? <ChangePassword /> : <HOME />}
        />
        <Route
          path="/applications"
          element={auth.isAuthorized ? <Applications /> : <HOME />}
        />

        <Route
          path="/applications/new"
          element={auth.isAuthorized ? <CreateNewApp /> : <HOME />}
        />

        <Route
          path="/applications/edit/:acronym"
          element={auth.isAuthorized ? <EditApp /> : <HOME />}
        />

        <Route
          path="/plan/create/:acronym"
          element={auth.isAuthorized ? <AddPlan /> : <HOME />}
        />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
    //-----------------------------------------------------------
  );
}

export default App;
