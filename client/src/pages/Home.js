import { useState, useEffect, useRef, useContext } from "react";
import AuthContext from "../context/AuthProvider";
import axios from "../api/axios";

const Home = () => {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

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
      console.log(JSON.stringify(JSON.stringify(response?.data?.token)));
      setUserName("");
      setPassword("");
    } catch (error) {}
  };

  return (
    <section>
      <p ref={errRef} className="errMsg">
        {errMsg}
      </p>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">User Name</label>
        <input
          type="text"
          id="username"
          ref={userRef}
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
          required
        ></input>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        ></input>
        <button>Submit</button>
      </form>
    </section>
  );
};

export default Home;
