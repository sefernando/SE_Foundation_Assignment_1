// import Register from "../components/RegisterBk";
import ChangePassword from "../components/ChangePassword";
import ChangeEmail from "../components/ChangeEmail";

const UserManagement = () => {
  return (
    <div className="items-wrapper d-flex justify-content-around mt-5">
      <ChangePassword />
      <ChangeEmail />
    </div>
  );
};

export default UserManagement;
