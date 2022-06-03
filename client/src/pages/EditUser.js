import { Button, Form, Row, Col } from "react-bootstrap";
import axios from "../api/axios";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthProvider";
import Select from "react-select";
import { useParams } from "react-router-dom";
import { alertService } from "../components/AlertService";
import "../CSS/EditUser.css";

const CHANG_ACC_STATUS_URL = "user/changeAccStatus";
const CHANGE_EMAIL_URL = "user/changeEmail";
const CHANGE_PWD_URL = "user/changePassword";
const ADD_TO_GROUP_URL = "user/addToGroup";
const REMOVE_FROM_GROUP_URL = "user/removeFromGroup";
const GET_GROUPS_URL = "/group/getAllGroups";
const GET_USER_URL = "/user/getUser/";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]{2,}\.[^\s@]{2,}$/;
const PASSWORD_REGEX =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,10}$/;

const EditUser = () => {
  const { userName } = useParams();

  const { auth } = useContext(AuthContext);

  const [user, setUser] = useState({});
  const [changeInfo, setChangeInfo] = useState(false);

  const [successAlt, setSuccessAlt] = useState(false);
  const [errAlt, setErrAlert] = useState(false);

  const [addGroups, setAddGroups] = useState([]);
  const [addOptions, setAddOptions] = useState([]);

  const [removeGroups, setRemoveGroups] = useState([]);
  const [removeOptions, setRemoveOptions] = useState([]);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);

  const buttonText = user.isActive ? "Disable Account" : "Enable Account";
  const buttonVariant = user.isActive ? "danger" : "success";

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(PASSWORD_REGEX.test(pwd));
  }, [pwd]);

  //fetch user
  useEffect(() => {
    (async function getUser() {
      try {
        const response = await axios.get(`${GET_USER_URL}${userName}`);
        console.log("getuser", response.data);
        if (response.data) {
          setUser(response.data);
          setChangeInfo(false);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [changeInfo]);

  //fetching all groups and preparing list options
  useEffect(() => {
    (async function () {
      try {
        const prepareOptions = [];

        const response = await axios.get(GET_GROUPS_URL);
        const existingGroups = response.data.groups;

        // setAllGroups(existingGroups);

        existingGroups.forEach((group) => {
          prepareOptions.push({ value: group, label: group });
        });
        setAddOptions(prepareOptions);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [changeInfo]);

  //function to check if user is registered in a group
  function checkGroup(userName, groupName) {
    if (userName === user.userName) {
      return user?.groups?.includes(groupName);
    } else {
      return false;
    }
  }

  //preparing options to add new group info
  const filteredAddOptions = addOptions.filter(
    (option) => !checkGroup(user.userName, option.value)
  );

  //preparing options to remove user from groups
  const filteredRemoveOptions = addOptions.filter((option) =>
    checkGroup(user.userName, option.value)
  );

  //function for admin to enable/disable account
  async function handleAccStatusSubmit(e) {
    e.preventDefault();

    try {
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

      if (response) {
        setUser({ ...user, isActive: !user.isActive });
        setSuccessAlt(true);
        user.isActive
          ? alert("Successfully deactivated")
          : alert("Successfully activated");
      }
    } catch (error) {
      setErrAlert(true);
      alert("error");
    }
  }

  //function for admin to change the email
  async function handleEmailSubmit(e) {
    e.preventDefault();

    try {
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

      if (response) {
        setChangeInfo(true);
        setEmail("");
        alert("Email chanaged successfully");
      }
    } catch (error) {
      alert("error");
    }
  }

  //function for admin to change the password
  async function handlePasswordSubmit(e) {
    e.preventDefault();

    try {
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

      if (response) {
        setPwd("");
        alert("Password chanaged successfully");
      }
    } catch (error) {
      alert("Error");
    }
  }

  //handleChange function to add
  const handleAddOptionsChange = (selectedOptions) => {
    // let value = Array.from(e.target.selectedOptions, (option) => option.value);
    setAddGroups(selectedOptions);
  };

  //handleChange function to remove
  const handleRemoveOptionsChange = (selectedOptions) => {
    // let value = Array.from(e.target.selectedOptions, (option) => option.value);
    setRemoveGroups(selectedOptions);
  };

  //handle groups submit button
  const handleAddGroupsSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        ADD_TO_GROUP_URL,
        JSON.stringify({
          userName: user.userName,
          adminUserName: auth.userName,
          groups: addGroups.map((x) => x.value),
        }),
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": auth.token,
          },

          withCredentials: true,
        }
      );

      if (response) {
        setAddGroups([]);
        setChangeInfo(true);
        alert("User successfully added to new groups");
      }
    } catch (error) {
      alert("Error");
    }
  };

  //handle groups submit button
  const handleRemoveGroupsSubmit = async (e) => {
    console.log("inside handle remove group submit");
    e.preventDefault();

    try {
      const response = await axios.put(
        REMOVE_FROM_GROUP_URL,
        JSON.stringify({
          userName: user.userName,
          adminUserName: auth.userName,
          groups: removeGroups.map((x) => x.value),
        }),
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": auth.token,
          },

          withCredentials: true,
        }
      );

      if (response) {
        setRemoveGroups([]);
        setChangeInfo(true);
        alert("User successfully removed from groups");
      }
    } catch (error) {
      alert("Error");
    }
  };

  return (
    <>
      <h2>Reset User Information</h2>

      <section className="form-wrapper">
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
              {email == user.email && (
                <small style={{ color: "red" }}>
                  This is user's registered email. Please enter a different one
                </small>
              )}
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Col>
            <Col sm={{ span: 10, offset: 2 }}>
              <Button
                type="submit"
                disabled={!validEmail || email === user.email}
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

        {/*  */}
        <Form onSubmit={handleAddGroupsSubmit}>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formHorizontalGroupsAdd"
          >
            <Form.Label column sm={2}>
              Add Groups
            </Form.Label>
            <Col sm={10}>
              <Select
                name="groups"
                isMulti={true}
                value={addGroups}
                options={filteredAddOptions}
                onChange={handleAddOptionsChange}
              />
            </Col>
            <Col sm={{ span: 10, offset: 2 }}>
              <Button
                type="submit"
                disabled={!addGroups.length}
                variant={addGroups.length ? "primary" : "secondary"}
              >
                Add Groups
              </Button>
            </Col>
          </Form.Group>
        </Form>

        <Form onSubmit={handleRemoveGroupsSubmit}>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formHorizontalGroupsRemove"
          >
            <Form.Label column sm={2}>
              Remove Groups
            </Form.Label>
            <Col sm={10}>
              <Select
                name="groups"
                isMulti={true}
                value={removeGroups}
                options={filteredRemoveOptions}
                onChange={handleRemoveOptionsChange}
              />
            </Col>
            <Col sm={{ span: 10, offset: 2 }}>
              <Button
                type="submit"
                disabled={!removeGroups.length}
                variant={removeGroups.length ? "primary" : "secondary"}
              >
                Remove Groups
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </section>
    </>
  );
};

export default EditUser;
