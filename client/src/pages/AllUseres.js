import { useEffect, useState } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const FETCH_USERS_URL = "user/getAllUsers";

const AllUseres = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);

  //fetching all useres
  useEffect(() => {
    (async function getAllUsers() {
      try {
        const response = await axios.get(FETCH_USERS_URL);
        // console.log("users", response);
        if (response) {
          setUsers(response.data.users);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

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
      <ListGroup defaultActiveKey="#link1">
        {users.map((user) => (
          <ListGroup.Item action onClick={handleClick} key={user.userName}>
            {user.userName}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export default AllUseres;
