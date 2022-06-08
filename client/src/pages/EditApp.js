import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Row, Col, Button } from "react-bootstrap";
import axios from "../api/axios";

import AuthContext from "../context/AuthProvider";

// const GET_ALL_APPS_URL = "app/all";
const GET_APP_URL = "app/";
const GET_ALL_GROUPS = "group/getAllGroups";
const EDIT_APP_URL = "app/editApp/";

const EditApp = () => {
  const { acronym } = useParams();
  const navigate = useNavigate();

  const sDate = new Date().toISOString().slice(0, 10);
  const eDate = new Date().toISOString().slice(0, 10);
  const today = new Date().toISOString().slice(0, 10);

  const { auth, setAuth } = useContext(AuthContext);

  const [description, setDescription] = useState("");

  const [startDate, setStartDate] = useState(sDate);
  const [validStartDate, setValidStartDate] = useState(false);

  const [endDate, setEndDate] = useState(eDate);
  const [validEndDate, setValidEndDate] = useState(false);

  const [permitCreate, setPermitCreate] = useState("");
  const [permitOpen, setPermitOpen] = useState("");
  const [permitToDoList, setPermitToDoList] = useState("");
  const [permitDoing, setPermitDoing] = useState("");
  const [permitDone, setPermitDone] = useState("");

  const [groups, setGroups] = useState([]);

  const [app, setApp] = useState("");

  const buttonStatus =
    // !acronym ||
    // !validAcronym ||
    !description ||
    !validStartDate ||
    !validEndDate ||
    !permitCreate ||
    !permitOpen ||
    !permitToDoList ||
    !permitDoing ||
    !permitDone;

  // fetching the app
  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(`${GET_APP_URL}${acronym}`);
        const appData = response.data.app;
        console.log("app", response.data.app);
        setApp(appData);
        setDescription(appData.description);
        setStartDate(appData.startDate);
        setEndDate(appData.endDate);
        setPermitCreate(appData.permitCreate);
        setPermitOpen(appData.permitOpen);
        setPermitToDoList(appData.permitToDoList);
        setPermitDoing(appData.permitDoing);
        setPermitDone(appData.permitDone);
      } catch (error) {
        console.log("get app error");
      }
    })();
  }, []);

  //fetching all groups
  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(GET_ALL_GROUPS);
        setGroups(response.data.groups);
      } catch (error) {
        console.log("fetching groups error");
      }
    })();
  }, []);

  //check if start date is valid
  useEffect(() => {
    if (startDate < today) {
      setValidStartDate(false);
    } else {
      setValidStartDate(true);
    }
  }, [startDate]);

  //check if end date is vaild
  useEffect(() => {
    if (endDate < startDate) {
      setValidEndDate(false);
    } else {
      setValidEndDate(true);
    }
  }, [startDate, endDate]);

  //set input options
  function setOptions() {
    return groups.map((x) => (
      <option key={x} value={x}>
        {x}
      </option>
    ));
  }

  //function get error msg
  function getErr(msg) {
    return (
      <small className="errMsg" style={{ color: "red" }}>
        {msg}
      </small>
    );
  }

  //clear inputs
  function clearInputs() {
    // setAcronym("");
    setDescription("");
    setStartDate(sDate);
    setEndDate(eDate);
    setPermitCreate("");
    setPermitOpen("");
    setPermitToDoList("");
    setPermitDoing("");
    setPermitDone("");
  }

  //submit form
  function handleSubmit(e) {
    e.preventDefault();

    const appData = {
      isLead: auth.isLead,
      description,
      startDate,
      endDate,
      permitCreate,
      permitOpen,
      permitToDoList,
      permitDoing,
      permitDone,
    };

    try {
      axios.put(`${EDIT_APP_URL}${acronym}`, appData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      alert("successfully Updated the app");
      clearInputs();
      navigate("/applications");
    } catch (error) {
      alert("error occured while updating the app");
    }
  }

  return (
    <>
      <br />
      <div>Edit App</div>
      <hr /> <br />
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3" controlId="AppAcronym">
          <Form.Label column sm="2">
            App Acronym
          </Form.Label>

          <Col sm="10">
            <Form.Control
              disabled
              type="text"
              placeholder="Enter App Acronym"
              value={acronym}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formAppDescription">
          <Form.Label column sm="2">
            App Description
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder="Enter App Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="appStartDate">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              value={startDate}
              placeholder=""
              onChange={(e) => setStartDate(e.target.value)}
            />
            {!validStartDate && getErr("Start date cannot be in the past")}
          </Form.Group>

          <Form.Group as={Col} controlId="appEndDate">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              placeholder=""
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            {!validEndDate &&
              getErr("End date must be later than the start date")}
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="permitCreate">
            <Form.Label>Permit Create</Form.Label>
            <Form.Select
              value={permitCreate}
              onChange={(e) => setPermitCreate(e.target.value)}
            >
              {setOptions()}
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} controlId="permitOpen">
            <Form.Label>Permit Open</Form.Label>
            <Form.Select
              value={permitOpen}
              onChange={(e) => setPermitOpen(e.target.value)}
            >
              {setOptions()}
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} controlId="permitToDoList">
            <Form.Label>Permit to do list</Form.Label>
            <Form.Select
              value={permitToDoList}
              onChange={(e) => setPermitToDoList(e.target.value)}
            >
              {setOptions()}
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} controlId="permitDoing">
            <Form.Label>Permit Doing</Form.Label>
            <Form.Select
              value={permitDoing}
              onChange={(e) => setPermitDoing(e.target.value)}
            >
              {setOptions()}
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} controlId="permitDone">
            <Form.Label>Permit Done</Form.Label>
            <Form.Select
              value={permitDone}
              onChange={(e) => setPermitDone(e.target.value)}
            >
              {setOptions()}
            </Form.Select>
          </Form.Group>
        </Row>

        <Button variant="primary" type="submit" disabled={buttonStatus}>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default EditApp;
