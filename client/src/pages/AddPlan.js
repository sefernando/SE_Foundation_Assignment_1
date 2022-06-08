import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useRef, useContext } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import axios from "../api/axios";

import AuthContext from "../context/AuthProvider";

const GET_ALL_PLANS_URL = "plan/all";
const ADD_PLAN_URL = "plan/create/";

const AddPlan = () => {
  const sDate = new Date().toISOString().slice(0, 10);
  const eDate = new Date().toISOString().slice(0, 10);
  const today = new Date().toISOString().slice(0, 10);

  const { auth, setAuth } = useContext(AuthContext);

  const { acronym } = useParams();
  // const [acronym, setAcronym] = useState("");
  // const [validAcronym, setValidAcronym] = useState(false);
  const [mvpName, setMvpName] = useState("");
  const [validMvpName, setValidMvpName] = useState(false);

  const [startDate, setStartDate] = useState(sDate);
  const [validStartDate, setValidStartDate] = useState(false);

  const [endDate, setEndDate] = useState(eDate);
  const [validEndDate, setValidEndDate] = useState(false);

  const [plans, setPlans] = useState([]);

  const buttonStatus =
    !mvpName || !validMvpName || !validStartDate || !validEndDate;

  //fetching all plans
  // useEffect(() => {
  //   (async function () {
  //     try {
  //       const response = await axios.get(GET_ALL_PLANS_URL);
  //       setPlans(response.data.plans);
  //     } catch (error) {
  //       console.log("get all plans error");
  //     }
  //   })();
  // }, []);
  async function fetchPlans() {
    try {
      const response = await axios.get(GET_ALL_PLANS_URL);
      setPlans(response.data.plans);
    } catch (error) {
      console.log("get all plans error");
    }
  }
  fetchPlans();

  //checking if mvp name is valid
  useEffect(() => {
    const existingPlans = plans.map((plan) => plan.mvpName);

    if (existingPlans.includes(mvpName)) {
      setValidMvpName(false);
    } else {
      setValidMvpName(true);
    }
  }, [mvpName]);

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

  //function get error msg
  function getErr(msg) {
    return (
      <small className="errMsg" style={{ color: "red" }}>
        {msg}
      </small>
    );
  }

  //submit form
  async function handleSubmit(e) {
    e.preventDefault();

    const planData = {
      mvpName,
      startDate,
      endDate,
    };

    try {
      await axios.post(`${ADD_PLAN_URL}${acronym}`, planData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      alert("successfully added the plan");
      fetchPlans();
      setMvpName("");
      setStartDate(sDate);
      setEndDate(eDate);
    } catch (error) {
      alert("error occured while adding the plan");
    }
  }

  return (
    <>
      <br />
      <div>Create a plan</div>
      <hr /> <br />
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3" controlId="appAcronym">
          <Form.Label column sm="2">
            Application
          </Form.Label>

          <Col sm="10">
            <Form.Control type="text" value={acronym} disabled />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="mvpName">
          <Form.Label column sm="2">
            MVP Name
          </Form.Label>

          <Col sm="10">
            {mvpName && !validMvpName && getErr("Name is not available")}
            <Form.Control
              type="text"
              placeholder="Enter MVP Name"
              value={mvpName}
              onChange={(e) => setMvpName(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="appStartDate">
          <Form.Label column sm="2">
            Start Date
          </Form.Label>

          <Col sm="10">
            <Form.Control
              type="date"
              value={startDate}
              placeholder=""
              onChange={(e) => setStartDate(e.target.value)}
            />
            {!validStartDate && getErr("Start date cannot be in the past")}
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="appEndDate">
          <Form.Label column sm="2">
            End Date
          </Form.Label>

          <Col sm="10">
            <Form.Control
              type="date"
              placeholder=""
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            {!validEndDate &&
              getErr("End date must be later than the start date")}
          </Col>
        </Form.Group>

        <Row>
          <Col>
            <Button variant="primary" type="submit" disabled={buttonStatus}>
              Submit
            </Button>
          </Col>
          <Col>
            <Link to={"/applications"}>
              <Button variant="success">Done</Button>
            </Link>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default AddPlan;
