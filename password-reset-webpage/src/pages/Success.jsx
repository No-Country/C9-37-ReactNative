import React from "react";
import { Card, Container } from "react-bootstrap";
import checkmark from "../assets/checkmark.svg";

const Success = () => {
  return (
    <Container className="d-flex justify-content-center">
      <Card style={{ maxWidth: "50%" }}>
        <Card.Body>
          <img src={checkmark} style={{ height: "180px", width: "120px" }} className="mt-0 pt-0" />
          <h2 className="text-center mb-4">¡Hurra!</h2>

          <p>
            Tu contraseña ha sido cambiada, por favor, vuelve a la app e intenta iniciar sesión con
            tu nueva contraseña.
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Success;
