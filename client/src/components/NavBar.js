import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import { useContext } from "react";

import AuthContext from "../context/AuthProvider";

const NavBar = () => {
  const { auth, setAuth } = useContext(AuthContext);

  function handleClick() {
    setAuth({});
  }

  return (
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

            {auth.groups?.includes("admin") && (
              <NavDropdown title="Admin" id="basic-nav-dropdown">
                <NavDropdown.Item as={NavLink} to="allUsers">
                  All Users
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="createUser">
                  Create
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="editUser">
                  Edit
                </NavDropdown.Item>
              </NavDropdown>
            )}

            <Button variant="outline-danger" onClick={handleClick}>
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
