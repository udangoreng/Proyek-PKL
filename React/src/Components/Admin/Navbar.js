import axios from "axios";
import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function () {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    //fetch Rest API
    await axios.post("http://localhost:8000/api/logout").then(() => {
      localStorage.removeItem("token");
      navigate("/login");
    });
  };

  return (
    <>
      <div>
        <Navbar
          bg="light"
          className="shadow"
          variant="light"
          style={{ marginBottom: "5vh" }}
        >
          <Container style={{ display: "flex" }}>
            <div className="logo">
              <img src="../../images/logo.png" alt="" height="25"/>
            </div>
            <div>
              <Nav className="me-auto">
                <Nav.Link href="#home">Dashboard</Nav.Link>
                <Nav.Link href="/register">Add Admin</Nav.Link>
                <Nav.Link onClick={logout}>Logout</Nav.Link>
                <Nav.Link disabled>Admin</Nav.Link>
              </Nav>
            </div>
          </Container>
        </Navbar>
      </div>
    </>
  );
}
