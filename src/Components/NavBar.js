import React from 'react';
import PropTypes from 'prop-types';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import GoogleButton from "react-google-button";

const NavBar = (props) => (
  <Navbar bg="dark" variant="dark" expand="lg">
    <Navbar.Brand href="#home">Yeast Notes</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        {!props.showLogin && (
          <Nav.Link href="#">Logged in as {props.emailAddress}</Nav.Link>
        )}
        {!props.showLogin && (
          <Nav.Link onClick={props.handleLogoff}>Log Out</Nav.Link>
        )}
      </Nav>
      {props.showLogin && (
        <GoogleButton type="dark" onClick={props.handleLogin} />
      )}
    </Navbar.Collapse>
  </Navbar>
);

NavBar.propTypes = {
  showLogin: PropTypes.bool,
  handleLogin: PropTypes.func,
  handleLogoff: PropTypes.func,
  emailAddress: PropTypes.string,
};

export default NavBar;
