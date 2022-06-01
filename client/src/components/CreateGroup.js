import { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import axios from "../api/axios";

const CHECK_USERNAME_URL = "group/check/";
const CREATE_GROUP_URL = "group/createGroup";

const CreateGroup = () => {
  const [groupName, setGroupName] = useState("");
  const [errMsg, setErrMsg] = useState("");

  //checking if username is available
  useEffect(() => {
    (async function checkUserName() {
      try {
        const response = await axios.get(CHECK_USERNAME_URL, {
          params: { groupName },
        });
        setErrMsg("Group Name is not available");
      } catch (error) {
        setErrMsg("");
      }
    })();
  }, [groupName]);

  //handle submit function
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        CREATE_GROUP_URL,
        { groupName },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setGroupName("");
      alert("Successfully created the group");
    } catch (error) {
      alert("error");
    }
  }

  return (
    <section>
      <p></p>
      <h2>Create New Group</h2>
      <br />
      <Form onSubmit={handleSubmit}>
        <Form.Text className=" text-danger">{errMsg}</Form.Text>
        <Form.Group
          as={Row}
          className="mb-3"
          controlId="formHorizontalGroupname"
        >
          <Form.Label column sm={2}>
            Group Name
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Enter Group Name"
              onChange={(e) => setGroupName(e.target.value)}
              value={groupName}
            />
          </Col>
          <Col sm={{ span: 10, offset: 2 }}>
            <Button
              type="submit"
              disabled={errMsg}
              variant={!errMsg ? "primary" : "secondary"}
            >
              Submit
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </section>
  );
};

export default CreateGroup;
