import Register from "../components/Register";
import ChangePassword from "../components/ChangePassword";
import ChangeEmail from "../components/ChangeEmail";

const UserManagement = () => {
  return (
    <>
      <ChangePassword />
      <ChangeEmail />
      {/* <Register /> */}
    </>
  );
};

export default UserManagement;
