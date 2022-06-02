import { useRef, useState, useEffect, useContext } from "react";
import axios from "../api/axios";

import AuthContext from "../context/AuthProvider";

const PASSWORD_REGEX =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,10}$/;
const CHANGE_PWD_URL = "user/changePassword";

const ChangePassword = () => {
  const { auth } = useContext(AuthContext);

  const emailRef = useRef();

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setValidPwd(PASSWORD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userName = auth.userName;

    try {
      const response = await axios.put(
        CHANGE_PWD_URL,
        JSON.stringify({ userName, password: pwd }),
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": auth.token,
          },
          withCredentials: true,
        }
      );

      alert("passwword successfully updated");
      setPwd("");
      setMatchPwd("");
    } catch (error) {
      if (!error.response) {
        setErrMsg("No server response");
      } else {
        setErrMsg("Password update failed");
      }
    }
  };

  return (
    <section>
      <p className="errMsg">{errMsg}</p>
      <h2>Change password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="password"> Password</label>
          <input
            type="password"
            name="password"
            id="pwdchange"
            value={pwd}
            ref={emailRef}
            onChange={(e) => setPwd(e.target.value)}
          />
          {pwd && !validPwd && (
            <small style={{ color: "red" }}>
              8 to 10 characters.
              <br />
              Must include uppercase, lowercase letters, a number and a special
              character.
              <br />{" "}
            </small>
          )}
        </div>

        <div>
          <label htmlFor="matchpassword">Confirm Password</label>
          <input
            type="password"
            name="matchpassword"
            id="matchpwdchage"
            value={matchPwd}
            onChange={(e) => setMatchPwd(e.target.value)}
          />
          {matchPwd && !validMatch && (
            <small style={{ color: "red" }}>Password mismatch</small>
          )}
        </div>

        <button>Submit</button>
      </form>
    </section>
  );
};

export default ChangePassword;
