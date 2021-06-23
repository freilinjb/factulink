import React from "react";
import { Nav, Card, Navbar, Container, Image } from "@themesberg/react-bootstrap";
import ReactLogo from "../../src/assets/img/technologies/react-logo-transparent.svg";
// import ReactLogo from "src/assets/img/technologies/react-logo-transparent.svg";

const NavbarPOS = () => {
  return (
    <>
      <Navbar
        variant="dark"
        expand="lg"
        bg="dark"
        className="navbar-transparent navbar-theme-primary"
      >
        <Container fluid className="position-relative container-fluid">
          <Navbar.Brand href="/" className="me-lg-3">
            <Image src={ReactLogo} />
          </Navbar.Brand>

          <Navbar.Collapse id="navbar-default-primary" className="w-100">
            <Nav className="navbar-nav-hover align-items-lg-center">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="#about">Ventas</Nav.Link>
              <Nav.Link href="#about">Caja</Nav.Link>
              <Nav.Link href="#contact">Configuracion</Nav.Link>
            </Nav>
          </Navbar.Collapse>

          <Navbar.Toggle aria-controls="navbar-default-primary" />
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarPOS;
