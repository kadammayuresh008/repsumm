import React from "react";
import { Navbar , Container ,NavDropdown ,Nav} from "react-bootstrap";



class WebNavbar extends React.Component {
  render() {
    return (
      <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Reeper</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link href="#Summarize">Summarize</Nav.Link>
            <Nav.Link href="#About">About</Nav.Link>
          </Nav>
          <Nav className="mr-auto">
          <Nav.Link href="#Signout">Signout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    );
  }
}

export default WebNavbar;


