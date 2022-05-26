import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import axios from "../api/axios";

const Home = () => {
  const navigate = useNavigate();

  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  // const errRef = useRef();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [userName, password]);

  //handle submit function
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "/auth/signin",
        JSON.stringify({ userName, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      // console.log(JSON.stringify(response.data));
      const token = response?.data?.token;
      const role = response?.data?.role;
      setAuth({ userName, token, role, isAuthorized: true });
      setUserName("");
      setPassword("");
      // console.log("token: ", response?.data?.token);
      // console.log("role: ", response?.data?.role);
      navigate("/UserManagement");
    } catch (error) {
      if (!error.response) {
        setErrMsg("No server response");
      } else {
        setErrMsg("Login failed");
      }
      // errRef.current.focus();
    }
  };

  return (
    <section>
      <p className="errMsg">{errMsg}</p>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">User Name</label>
          <input
            type="text"
            id="username"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            required
          ></input>
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          ></input>
        </div>
        <button>Submit</button>
      </form>
    </section>
  );
};

export default Home;
