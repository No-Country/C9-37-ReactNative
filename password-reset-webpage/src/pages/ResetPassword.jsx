import React, { useEffect, useRef, useState } from "react";
import { Form, Card, Button, Alert, Toast } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ToastNotification from "../components/ToastNotification";
import { useAuth } from "../context/AuthContext";
import { useQuery } from "../hooks/useQuery";
import mascotapp from "../assets/mascotapp.png";

export const ResetPassword = () => {
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const { resetPassword, setMode, setOobCode, oobCode, setPasswordChanged } = useAuth();
  const [error, setError] = useState();
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);
  const query = useQuery();
  const navigate = useNavigate();

  useEffect(() => {
    setMode(query.get("mode"));
    setOobCode(query.get("oobCode"));
    console.log(window.location.pathname);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setMessage("");
      setLoading(true);
      await resetPassword(query.get("oobCode"), passwordRef.current.value);
      setMessage("Revisa tu correo para más instrucciones.");
      setPasswordChanged(true);
      navigate("/success");
    } catch (error) {
      setPasswordChanged(false);
      setError("Algo salió mal, intentalo de nuevo");
      console.log(error);
      setLoading(true);
    }
    setLoading(false);
  }
  return (
    <div className="h-100">
      {error && <ToastNotification title="Algo salió mal!" body={error} variant="Danger" />}
      {message && <ToastNotification title="¡Excelente!" body={message} variant="Light" />}
      <Card>
        <Card.Body>
          <img src={mascotapp} style={{ height: "200px", width: "150px" }} className="mt-0 pt-0" />
          <h2 className="text-center mb-4">Cambia tu contraseña</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group id="password">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="confirmPassword">
              <Form.Label>Confirma tu contraseña</Form.Label>
              <Form.Control type="password" ref={confirmPasswordRef} required />
            </Form.Group>
            <Button type="submit" className="w-100 mt-2 $indigo-700" disabled={loading}>
              Reset Password
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};
