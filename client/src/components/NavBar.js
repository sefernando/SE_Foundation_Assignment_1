import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import { useContext, useEffect, useState } from "react";

import AuthContext from "../context/AuthProvider";
import axios from "../api/axios";

const NavBar = () => {
  const { auth, setAuth } = useContext(AuthContext);

  console.log("auth", auth);
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
            <Nav.Link as={NavLink} to="/applications">
              Applications
            </Nav.Link>
            {/* <Nav.Link as={NavLink} to="/UserManagement">
              User Management
            </Nav.Link> */}

            {/* auth.groups?.includes("admin") */}
            {auth.isAdmin && (
              <NavDropdown title="User Management" id="admin-nav-dropdown">
                <NavDropdown.Item as={NavLink} to="editUsers">
                  Edit User
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="createUser">
                  Create User
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="createGroup">
                  Create Group
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>

        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text className="mx-1">
            Signed in as:
            <NavDropdown title={auth.userName} id="user-nav-dropdown">
              <NavDropdown.Item as={NavLink} to="changeEmail">
                Change Email
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="changePassword">
                Change Password
              </NavDropdown.Item>
            </NavDropdown>
            {/* <Nav.Link
              className="d-inline text-decoration-underline text-primary"
              as={NavLink}
              to="UserManagement"
            >
              {auth.userName}
            </Nav.Link> */}
          </Navbar.Text>

          <Button
            className="mx-1"
            variant="outline-danger"
            onClick={handleClick}
          >
            Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
