import { useContext } from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  NavLink,
} from "react-router-dom";

import AuthContext from "../context/AuthProvider";

import HOME from "../pages/Home";
import UserManagement from "../pages/UserManagement";
import Admin from "../pages/Admin";
import CreateUser from "../pages/CreateUser";
import EditUser from "../pages/EditUser";
import AllUseres from "../pages/AllUseres";
import ErrorPage from "../pages/ErrorPage";

const NavBar = () => {
  const { auth } = useContext(AuthContext);
  return (
    <Router>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">TMS</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="/UserManagement">
                User Management
              </Nav.Link>
              <NavDropdown title="Admin" id="basic-nav-dropdown">
                <NavDropdown.Item as={NavLink} to="allUsers">
                  All Users
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="createUser">
                  Create User
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="editUser">
                  Edit User
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

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
  );
};

export default NavBar;
