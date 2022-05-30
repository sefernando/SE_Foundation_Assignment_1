import { useRef, useState, useEffect, useContext } from "react";
import axios from "../api/axios";

import AuthContext from "../context/AuthProvider";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]{2,}\.[^\s@]{2,}$/;
const CHANGE_EMAIL_URL = "user/changeEmail";

const ChangeEmail = () => {
  const emailRef = useRef();
  const { auth } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userName = auth.userName;

    try {
      const response = await axios.put(
        CHANGE_EMAIL_URL,
        JSON.stringify({ userName, email }),
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": auth.token,
          },
          withCredentials: true,
        }
      );
      if (response) console.log("email successfully changed");
    } catch (error) {
      if (!error.response) {
        setErrMsg("No server response");
      } else {
        setErrMsg("Email updating Failed");
      }
    }
  };

  return (
    <section>
      <p className="errMsg">{errMsg}</p>
      <h2>Change Email</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="chnageEmai">Email</label>
          <input
            type="email"
            name="changeEmail"
            id="changeEmail"
            ref={emailRef}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {email && !validEmail && (
            <small style={{ color: "red" }}>Enter a valid email</small>
          )}
        </div>
        <button>Submit</button>
      </form>
    </section>
  );
};

export default ChangeEmail;
