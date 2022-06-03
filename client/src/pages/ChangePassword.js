import { useRef, useState, useEffect, useContext } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import axios from "../api/axios";

import AuthContext from "../context/AuthProvider";

const PASSWORD_REGEX =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,10}$/;
const CHANGE_PWD_URL = "user/changePassword";

const ChangePassword = () => {
  const { auth } = useContext(AuthContext);

  const emailRef = useRef();

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setValidPwd(PASSWORD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userName = auth.userName;

    try {
      const response = await axios.put(
        CHANGE_PWD_URL,
        JSON.stringify({ userName, password: pwd }),
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": auth.token,
          },
          withCredentials: true,
        }
      );

      alert("passwword successfully updated");
      setPwd("");
      setMatchPwd("");
    } catch (error) {
      if (!error.response) {
        setErrMsg("No server response");
      } else {
        setErrMsg("Password update failed");
      }
    }
  };

  return (
    <>
      <section>
        <p className="errMsg">{errMsg}</p>
        <h2>Change password</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formHorizontalPassword"
          >
            <Form.Label column sm={2}>
              Password
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="password"
                placeholder="Password"
                value={pwd}
                ref={emailRef}
                onChange={(e) => setPwd(e.target.value)}
              />
              {pwd && !validPwd && (
                <small style={{ color: "red" }}>
                  8 to 10 characters.
                  <br />
                  Must include uppercase, lowercase letters, a number and a
                  special character.
                  <br />{" "}
                </small>
              )}
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formHorizontalConfirmPassword"
          >
            <Form.Label column sm={2}>
              Confirm Password
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="password"
                placeholder="Password"
                value={matchPwd}
                onChange={(e) => setMatchPwd(e.target.value)}
              />
              {matchPwd && !validMatch && (
                <small style={{ color: "red" }}>Password mismatch</small>
              )}
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Col sm={{ span: 10, offset: 2 }}>
              <Button
                type="submit"
                disabled={!validPwd || !validMatch}
                variant={validMatch ? "primary" : "secondary"}
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

export default ChangePassword;
