import { Button, Form, Row, Col } from "react-bootstrap";
import axios from "../api/axios";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthProvider";
import { toBeEnabled } from "@testing-library/jest-dom/dist/matchers";

const CHANG_ACC_STATUS_URL = "/user/changeAccStatus";
const CHANGE_EMAIL_URL = "user/changeEmail";
const CHANGE_PWD_URL = "user/changePassword";

const PASSWORD_REGEX =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,10}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]{2,}\.[^\s@]{2,}$/;

const ResetUserInfo = ({ user }) => {
  const { auth } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);

  console.log("auth", auth);
  const buttonText = user.isActive ? "Disable Account" : "Enable Account";
  const buttonVariant = user.isActive ? "danger" : "success";

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(PASSWORD_REGEX.test(pwd));
  }, [pwd]);

  //function for admin to enable/disable account
  async function handleAccStatusSubmit(e) {
    e.preventDefault();
    console.log("handleAccStatusSubmit");

    const response = await axios.put(
      CHANG_ACC_STATUS_URL,
      JSON.stringify({
        userName: user.userName,
        adminUserName: auth.userName,
        isActive: !user.isActive,
      }),
      {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": auth.token,
        },
        withCredentials: true,
      }
    );
  }

  //function for admin to change the email
  async function handleEmailSubmit(e) {
    e.preventDefault();

    const response = await axios.put(
      CHANGE_EMAIL_URL,
      JSON.stringify({
        userName: user.userName,
        adminUserName: auth.userName,
        email: email,
      }),
      {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": auth.token,
        },
        withCredentials: true,
      }
    );
  }

  //function for admin to change the password
  async function handlePasswordSubmit(e) {
    e.preventDefault();

    const response = await axios.put(
      CHANGE_PWD_URL,
      JSON.stringify({
        userName: user.userName,
        adminUserName: auth.userName,
        password: pwd,
      }),
      {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": auth.token,
        },
        withCredentials: true,
      }
    );
  }

  return (
    <>
      <h2>Reset User Information</h2>

      <Form onSubmit={handleAccStatusSubmit}>
        <Form.Group
          as={Row}
          className="mb-3"
          controlId="formHorizontalUsername"
        >
          <Form.Label column sm={2}>
            Username
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder={user.userName}
              aria-label="Disabled input example"
              disabled
              readOnly
            />
          </Col>
          <Col sm={{ span: 10, offset: 2 }}>
            <Button variant={buttonVariant} type="submit">
              {buttonText}
            </Button>
          </Col>
        </Form.Group>
      </Form>

      <Form onSubmit={handleEmailSubmit}>
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
          <Form.Label column sm={2}>
            Email
          </Form.Label>
          <Col sm={10}>
            {email && !validEmail && (
              <small style={{ color: "red" }}>Enter a valid email</small>
            )}
            <Form.Control
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Col>
          <Col sm={{ span: 10, offset: 2 }}>
            <Button
              type="submit"
              disabled={!validEmail}
              variant={validEmail ? "primary" : "secondary"}
            >
              Change Email
            </Button>
          </Col>
        </Form.Group>
      </Form>

      <Form onSubmit={handlePasswordSubmit}>
        <Form.Group
          as={Row}
          className="mb-3"
          controlId="formHorizontalPassword"
        >
          <Form.Label column sm={2}>
            Password
          </Form.Label>
          <Col sm={10}>
            {pwd && !validPwd && (
              <small style={{ color: "red" }}>
                8 to 10 characters including alphabets , numbers, and special
                characters
              </small>
            )}
            <Form.Control
              type="password"
              placeholder="Password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
            />
          </Col>
          <Col sm={{ span: 10, offset: 2 }}>
            <Button
              type="submit"
              disabled={!validPwd}
              variant={validPwd ? "primary" : "secondary"}
            >
              Change Password
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </>
  );
};

export default ResetUserInfo;
