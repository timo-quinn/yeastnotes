import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Button } from "semantic-ui-react";

const NavBar = (props) => (
  <Menu inverted attached="bottom">
    <Menu.Item header>Yeast Notes</Menu.Item>
    {!props.showLogin && (
      <Menu.Item>
        Logged in as {props.emailAddress}
      </Menu.Item>
    )}
    <Menu.Menu position='right'>
      {!props.showLogin && (
        <Menu.Item>
          <Button onClick={props.handleLogoff}>Log Out</Button>
        </Menu.Item>
      )}
      {props.showLogin && (
        <Menu.Item>
          <Button primary onClick={props.handleLogin}>Log In With Google</Button>
        </Menu.Item>
      )}
    </Menu.Menu>
  </Menu>
);

NavBar.propTypes = {
  showLogin: PropTypes.bool,
  handleLogin: PropTypes.func,
  handleLogoff: PropTypes.func,
  emailAddress: PropTypes.string,
};

export default NavBar;
