import { useState, useEffect, useRef, useContext } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

import AuthContext from "../context/AuthProvider";
import "../CSS/Login.css";

const Login = () => {
  const navigate = useNavigate();

  const { auth, setAuth } = useContext(AuthContext);
  const userRef = useRef();
  // const errRef = useRef();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [userName, password]);

  //handle submit function
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "/auth/signin",
        JSON.stringify({ userName, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const { token, groups, active, email } = response?.data;

      if (active) {
        setAuth({ userName, email, token, groups, isAuthorized: true });
      } else {
        alert("Your account is disabled. Please contact system admin");
      }

      console.log("printing auth", auth.isAuthorized);
      setUserName("");
      setPassword("");
      navigate("/apps");
    } catch (error) {
      if (!error.response) {
        setErrMsg("No server response");
      } else {
        setErrMsg("Login Failed");
      }
      // errRef.current.focus();
    }
  };

  return (
    <>
      <section className="login_wrapper">
        <p className="errMsg" style={{ color: "red" }}>
          {errMsg}
        </p>
        <Form onSubmit={handleSubmit}>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextUsername"
          >
            <Form.Label column sm="2">
              Username
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="Enter username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
                required
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Form.Label column sm="2">
              Password
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="password"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
            </Col>
          </Form.Group>

          <Form.Label column sm="2"></Form.Label>

          <Button
            type="submit"
            disabled={!userName || !password}
            variant={userName && password ? "primary" : "secondary"}
          >
            Submit
          </Button>
        </Form>
      </section>
    </>
  );
};

export default Login;
