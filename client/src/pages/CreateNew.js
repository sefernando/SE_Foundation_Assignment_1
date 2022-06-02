import { useState } from "react";
import Register from "../components/Register";
import CreateGroup from "../components/CreateGroup";
import "../CSS/CreateNew.css";

const CreateNew = () => {
  const [success, setSuccess] = useState(false);
  return (
    <>
      <div className="componentWrapper">
        <Register
          className="flexItem"
          success={success}
          setSuccess={setSuccess}
        />

        <CreateGroup
          className="flexItem"
          success={success}
          setSuccess={setSuccess}
        />
      </div>
    </>
  );
};

export default CreateNew;
