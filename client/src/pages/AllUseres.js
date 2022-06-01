import { useEffect, useState } from "react";
import { ListGroup, InputGroup, FormControl } from "react-bootstrap";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const FETCH_USERS_URL = "user/getAllUsers";

const AllUseres = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  //fetching all useres
  useEffect(() => {
    (async function getAllUsers() {
      try {
        const response = await axios.get(FETCH_USERS_URL);

        if (response) {
          setFilteredUsers(response.data.users);
          setUsers(response.data.users);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    const result = users.filter((user) => user.userName.startsWith(userName));
    setFilteredUsers(result);
  }, [userName]);

  function handleClick(e) {
    // console.log("clicked", e.target.innerHTML);
    const params = e.target.innerHTML;
    navigate(`/editUser/${params}`);
  }

  return (
    <>
      <br />
      <h2>All Users</h2>
      <hr />

      <InputGroup className="mb-3">
        <FormControl
          placeholder="Search user"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </InputGroup>

      <ListGroup>
        {filteredUsers?.map((user) => (
          <ListGroup.Item action onClick={handleClick} key={user.userName}>
            {user.userName}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export default AllUseres;
