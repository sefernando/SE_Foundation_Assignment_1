import React from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";

const AllUseres = () => {
  function handleClick(e) {
    e.preventDefault();
  }

  return (
    <ListGroup defaultActiveKey="#link1">
      <ListGroup.Item action onClick={handleClick}>
        This one is a button
      </ListGroup.Item>
    </ListGroup>
  );
};

export default AllUseres;
