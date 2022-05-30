import { Button, Form, Row, Col } from "react-bootstrap";

import { useState } from "react";
import axios from "../api/axios";

const GET_USER_URL = "/user/getUser/";

const SearchUser = ({ setUser, setUserAvailable }) => {
  const [username, setUsername] = useState("");

  //handle submit function
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const resposnse = await axios.get(`${GET_USER_URL}${username}`);
      // console.log("response", resposnse.data);
      if (resposnse) {
        setUser(resposnse.data);
        setUserAvailable(true);
      } else {
        setUserAvailable(false);
        setUser({});
      }
    } catch (error) {
      setUserAvailable(false);
      setUser({});
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col>
          <Form.Control
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Col>
        <Col>
          <Button type="submit" variant="primary">
            Search
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchUser;
