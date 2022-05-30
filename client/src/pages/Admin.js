import { useState } from "react";

import Register from "../components/Register";
import SearchUser from "../components/SearchUser";
import ResetUserInfo from "../components/ResetUserInfo";

const Admin = () => {
  const [user, setUser] = useState({});
  const [userAvailable, setUserAvailable] = useState(false);

  return (
    <>
      <SearchUser setUser={setUser} setUserAvailable={setUserAvailable} />

      <br />

      {userAvailable && <ResetUserInfo user={user} />}

      <br />
      <Register />
    </>
  );
};

export default Admin;
