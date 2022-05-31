import { useState, useEffect, useRef } from "react";
import axios from "../api/axios";

import Register from "../components/Register";
import SearchUser from "../components/SearchUser";
import ResetUserInfo from "../components/ResetUserInfo";

const GET_GROUPS_URL = "/group/getAllGroups";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]{2,}\.[^\s@]{2,}$/;
const PASSWORD_REGEX =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,10}$/;

let existingGroups = [];

const Admin = () => {
  // const userRef = useRef();

  const [user, setUser] = useState({});
  const [userAvailable, setUserAvailable] = useState(false);

  const [allGroups, setAllGroups] = useState([]);

  const [groups, setGroups] = useState([]);
  const [options, setOptions] = useState([]);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(PASSWORD_REGEX.test(pwd));
  }, [pwd]);

  useEffect(() => {
    (async function () {
      try {
        let prepareOptions = [];

        const response = await axios.get(GET_GROUPS_URL);
        existingGroups = response.data.groups;

        setAllGroups(existingGroups);

        existingGroups.forEach((group) => {
          prepareOptions.push({ value: group, label: group });
        });
        setOptions(prepareOptions);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      <SearchUser setUser={setUser} setUserAvailable={setUserAvailable} />

      <br />

      {userAvailable && (
        <ResetUserInfo
          user={user}
          options={options}
          groups={groups}
          allGroups={allGroups}
          setGroups={setGroups}
          pwd={pwd}
          setPwd={setPwd}
          validPwd={validPwd}
          email={email}
          setEmail={setEmail}
          validEmail={validEmail}
        />
      )}

      <br />
      <Register
        groups={groups}
        setGroups={setGroups}
        options={options}
        pwd={pwd}
        setPwd={setPwd}
        validPwd={validPwd}
        email={email}
        setEmail={setEmail}
        validEmail={validEmail}
      />
    </>
  );
};

export default Admin;
