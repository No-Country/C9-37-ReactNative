import React, { useState } from "react";
import { ToastContainer, Toast } from "react-bootstrap";

const ToastNotification = ({ title, body, variant }) => {
  const [show, setShow] = useState(true);
  return (
    <ToastContainer className="p-3" position="top-center">
      <Toast
        className="align-self-start top-0  mx-auto m-1"
        bg={variant}
        onClose={() => setShow(false)}
        show={show}
        delay={3000}
        autohide
      >
        <Toast.Header>
          <strong className="me-auto">{title}</strong>
        </Toast.Header>
        <Toast.Body className={variant === "Dark" && "text-white"}>
          {body}
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastNotification;
