import { Alert } from "react-bootstrap";

function success(message, options) {
  console.log("alert called");

  return (
    <Alert key="1" variant="success">
      success!
    </Alert>
  );
}

function error(message, options) {
  return (
    <Alert key="0" variant="danger">
      Error!
    </Alert>
  );
}

export const alertService = {
  success,
  error,
};
