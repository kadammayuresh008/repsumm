import React from "react";
import { Navbar , Container ,NavDropdown ,Nav} from "react-bootstrap";
import LogoImage from "../Images/UploadDocImage1.png";



class WebNavbar extends React.Component {
  render() {
    const imgStyle={
      height:'50px',
      width:'50px',
  }
    return (
      <Navbar bg="light" expand="lg">
      <Container>
      <img 
            src={LogoImage} 
            alt="Image not found"
            style={imgStyle}></img>
        <Navbar.Brand href="/">Reeper</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link href="/UploadDoc">Summarize</Nav.Link>
            <Nav.Link href="/About">About</Nav.Link>
          </Nav>
          {/* <Nav className="mr-auto">
          <Nav.Link href="/Login">Login</Nav.Link>
          </Nav>
          <Nav className="mr-auto">
          <Nav.Link href="/Signup">SignUp</Nav.Link>
          </Nav> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
    );
  }
}

export default WebNavbar;


