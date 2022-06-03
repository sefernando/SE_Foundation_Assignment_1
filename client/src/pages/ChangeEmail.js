import { useRef, useState, useEffect, useContext } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import axios from "../api/axios";

import AuthContext from "../context/AuthProvider";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]{2,}\.[^\s@]{2,}$/;
const CHANGE_EMAIL_URL = "user/changeEmail";

const ChangeEmail = () => {
  const emailRef = useRef();
  const { auth } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setErrMsg(email === auth.email);
  }, [email]);

  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userName = auth.userName;

    try {
      const response = await axios.put(
        CHANGE_EMAIL_URL,
        JSON.stringify({ userName, email }),
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": auth.token,
          },
          withCredentials: true,
        }
      );
      if (response) {
        alert("Email changed successfully");
        setEmail("");
      }
    } catch (error) {
      alert("Email updating failed. make sure you entered a diffeent email");
    }
  };

  return (
    <>
      <section>
        <p className="errMsg">{errMsg}</p>
        <h2>Change Email</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              Email
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="email"
                placeholder="Email"
                ref={emailRef}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              {email && !validEmail && (
                <small style={{ color: "red" }}>Enter a valid email</small>
              )}
              {email == auth.email && (
                <small style={{ color: "red" }}>
                  This is your registered email. Please enter a different one
                </small>
              )}
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Col sm={{ span: 10, offset: 2 }}>
              <Button
                type="submit"
                disabled={!validEmail || errMsg}
                variant={validEmail ? "primary" : "secondary"}
              >
                Sign in
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </section>
    </>
  );
};

export default ChangeEmail;
