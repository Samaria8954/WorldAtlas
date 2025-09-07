import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

export const Headers = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <header
      style={{
        marginBottom: expanded ? "35rem" : "0px", 
        transition: "margin 0.3s ease",
      }}
    >
      <Navbar
        bg="dark"
        expand="lg"
        className="shadow-sm"
        expanded={expanded}
        onToggle={(nextExpanded) => setExpanded(nextExpanded)}
      >
        <Container>
          {/* Logo */}
          <Navbar.Brand as={NavLink} to="/">
            <h1 className="h4 mb-0">WorldAtlas</h1>
          </Navbar.Brand>

          {/* Toggle Button */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          {/* Links */}
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={NavLink} to="/" end>
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="/about">
                About
              </Nav.Link>
              <Nav.Link as={NavLink} to="/country">
                Country
              </Nav.Link>
              <Nav.Link as={NavLink} to="/contact">
                Contact
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};
