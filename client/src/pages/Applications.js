import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

import AuthContext from "../context/AuthProvider";

const Applications = () => {
  const navigate = useNavigate();

  const { auth, setAuth } = useContext(AuthContext);

  function handleCreateNewApp() {
    navigate("/applications/new");
  }

  return (
    <>
      <Button
        variant="link"
        disabled={auth.isLead ? false : true}
        onClick={handleCreateNewApp}
      >
        Create New
      </Button>
    </>
  );
};

export default Applications;
