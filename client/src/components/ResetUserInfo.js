import { Button, Form, Row, Col } from "react-bootstrap";
import axios from "../api/axios";

const ResetUserInfo = ({ user }) => {
  console.log("user", user);
  const buttonText = user.isActive ? "Disable Account" : "Enable Account";
  const buttonVariant = user.isActive ? "danger" : "success";

  async function handleAccStatusSubmit(e) {
    e.preventDefault();
    console.log("handleAccStatusSubmit");

    // const response = await axios.
  }

  async function handleEmailSubmit(e) {
    e.preventDefault();
    console.log("handleEmailSubmit");
  }

  async function handlePasswordSubmit(e) {
    e.preventDefault();
    console.log("handlePasswordSubmit");
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
            <Form.Control type="email" placeholder="Email" />
          </Col>
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="submit">Change Email</Button>
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
            <Form.Control type="password" placeholder="Password" />
          </Col>
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="submit">Change Password</Button>
          </Col>
        </Form.Group>
      </Form>
    </>
  );
};

export default ResetUserInfo;
