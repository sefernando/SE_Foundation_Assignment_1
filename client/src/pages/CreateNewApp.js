import { useState, useEffect, useRef, useContext } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import axios from "../api/axios";

import AuthContext from "../context/AuthProvider";

const GET_ALL_APPS_URL = "app/all";
const GET_ALL_GROUPS = "group/getAllGroups";
const CREATE_APP_URL = "app/createApp";

const CreateNewApp = () => {
  const sDate = new Date().toISOString().slice(0, 10);
  const eDate = new Date().toISOString().slice(0, 10);
  const today = new Date().toISOString().slice(0, 10);

  const { auth, setAuth } = useContext(AuthContext);

  const acronymRef = useRef();

  const [acronym, setAcronym] = useState("");
  const [validAcronym, setValidAcronym] = useState(false);

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

  const [apps, setApps] = useState([]);
  const [groups, setGroups] = useState([]);

  const buttonStatus =
    !acronym ||
    !validAcronym ||
    !description ||
    !validStartDate ||
    !validEndDate ||
    !permitCreate ||
    !permitOpen ||
    !permitToDoList ||
    !permitDoing ||
    !permitDone;

  //fetching all apps
  // useEffect(() => {
  //   (async function () {
  //     try {
  //       const response = await axios.get(GET_ALL_APPS_URL);
  //       setApps(response.data.apps);
  //     } catch (error) {
  //       console.log("get all apps error");
  //     }
  //   })();
  // }, []);
  async function fetchingApps() {
    try {
      const response = await axios.get(GET_ALL_APPS_URL);
      setApps(response.data.apps);
    } catch (error) {
      console.log("get all apps error");
    }
  }
  fetchingApps();

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

  //checking if acronym is valid
  useEffect(() => {
    const existingAcronyms = apps.map((app) => app.acronym);

    if (existingAcronyms.includes(acronym)) {
      setValidAcronym(false);
    } else {
      setValidAcronym(true);
    }
  }, [acronym]);

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
    setAcronym("");
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
  async function handleSubmit(e) {
    e.preventDefault();

    const appData = {
      isLead: auth.isLead,
      acronym,
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
      const response = await axios.post(CREATE_APP_URL, appData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      console.log("status", response);

      alert("successfully created the app");
      fetchingApps();
      clearInputs();
    } catch (error) {
      alert("error occured while creating the app");
    }
  }

  return (
    <>
      <br />
      <div>CreateNewApp</div>
      <hr /> <br />
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3" controlId="AppAcronym">
          <Form.Label column sm="2">
            App Acronym
          </Form.Label>

          <Col sm="10">
            {acronym && !validAcronym && getErr("Acronym is not available")}
            <Form.Control
              type="text"
              placeholder="Enter App Acronym"
              ref={acronymRef}
              value={acronym}
              onChange={(e) => setAcronym(e.target.value)}
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
              <option value={""} key="empty"></option>
              {setOptions()}
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} controlId="permitOpen">
            <Form.Label>Permit Open</Form.Label>
            <Form.Select
              value={permitOpen}
              onChange={(e) => setPermitOpen(e.target.value)}
            >
              <option value={""} key="empty"></option>
              {setOptions()}
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} controlId="permitToDoList">
            <Form.Label>Permit to do list</Form.Label>
            <Form.Select
              value={permitToDoList}
              onChange={(e) => setPermitToDoList(e.target.value)}
            >
              <option value={""} key="empty"></option>
              {setOptions()}
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} controlId="permitDoing">
            <Form.Label>Permit Doing</Form.Label>
            <Form.Select
              value={permitDoing}
              onChange={(e) => setPermitDoing(e.target.value)}
            >
              <option value={""} key="empty"></option>
              {setOptions()}
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} controlId="permitDone">
            <Form.Label>Permit Done</Form.Label>
            <Form.Select
              value={permitDone}
              onChange={(e) => setPermitDone(e.target.value)}
            >
              <option value={""} key="empty"></option>
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

export default CreateNewApp;
