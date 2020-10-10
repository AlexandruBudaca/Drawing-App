import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { Nav } from "react-bootstrap";
import logo from "../assets/logo.png";
const myNavbar = () => {
  return (
    <Navbar collapseOnSelect expand="lg">
      <Navbar.Brand href="#home">
        <img
          src={logo}
          className="d-inline-block align-top"
          alt="React Bootstrap logo"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
          <Nav.Link href="#deets">More deets</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default myNavbar;
