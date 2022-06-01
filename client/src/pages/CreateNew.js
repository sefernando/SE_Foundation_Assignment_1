import Register from "../components/Register";
import CreateGroup from "../components/CreateGroup";
import "../CSS/CreateNew.css";

const CreateNew = () => {
  return (
    <>
      <div className="componentWrapper">
        <Register className="flexItem" />

        <CreateGroup className="flexItem" />
      </div>
    </>
  );
};

export default CreateNew;
