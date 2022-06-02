import { useState } from "react";
import { Alert } from "react-bootstrap";

const SuccessAlert = () => {
  const [successMsg, setSucsessMsg] = useState("");

  return (
    <div class="alert alert-warning alert-dismissible fade show" role="alert">
      <strong>Success</strong>
      <button
        type="button"
        class="close"
        data-dismiss="alert"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
};

export default SuccessAlert;
