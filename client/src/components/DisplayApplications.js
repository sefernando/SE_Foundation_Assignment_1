import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, Button, Row, Col, Container } from "react-bootstrap";
import axios from "../api/axios";

const GET_ALL_APPS_URL = "app/all";

const DisplayApplications = () => {
  const navigate = useNavigate();

  const [apps, setApps] = useState([]);

  //fetching all apps
  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(GET_ALL_APPS_URL);
        setApps(response.data.apps);
      } catch (error) {
        console.log("error occured while fetching apps");
      }
    })();
  }, []);

  function handleEdit(acronym) {}

  return (
    <Container>
      <>
        {apps.map((app) => (
          <Row className="mx-2 my-2" key={app.acronym}>
            <Card>
              <Card.Header>{app.acronym}</Card.Header>
              <Card.Body>
                <Row>
                  <Col sm={2}>
                    <Card.Text>Start Date: </Card.Text>
                  </Col>
                  <Col sm={4}>
                    <Card.Text>{app.startDate}</Card.Text>
                  </Col>
                </Row>
                <Row>
                  <Col sm={2}>
                    <Card.Text>End Date: </Card.Text>
                  </Col>
                  <Col sm={4}>
                    <Card.Text>{app.endDate}</Card.Text>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Button variant="outline-primary">View Progress</Button>
                  </Col>
                  <Col>
                    <Link to={`/plan/create/${app.acronym}`}>
                      <Button variant="outline-primary">Add Plan</Button>
                    </Link>
                  </Col>
                  <Col>
                    <Button variant="outline-primary">Add Task</Button>
                  </Col>
                  <Col>
                    <Link to={`/applications/edit/${app.acronym}`}>
                      <Button variant="outline-primary">Edit App</Button>
                    </Link>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Row>
        ))}
      </>
    </Container>
  );
};

export default DisplayApplications;
