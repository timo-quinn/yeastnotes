import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Button } from "semantic-ui-react";

const NavBar = (props) => (
  <Menu inverted attached="bottom" borderless>
    <Menu.Item>
      <img alt="" src='/logo-simple.png' />
    </Menu.Item>
    <Menu.Item header>Yeast Notes</Menu.Item>
    {!props.showLogin && (
      <Menu.Item>
        <Button positive icon="plus" content="Add Brew" onClick={props.handleAdd} />
      </Menu.Item>
    )}
    <Menu.Menu position='right'>
      {!props.showLogin && (
        <Menu.Item>
          Logged in as {props.emailAddress}
        </Menu.Item>
      )}
      {!props.showLogin && (
        <Menu.Item>
          <Button onClick={props.handleLogoff} icon="log out" content="Log Out" />
        </Menu.Item>
      )}
      {props.showLogin && (
        <Menu.Item>
          <Button primary icon="google" onClick={props.handleLogin} content="Log In With Google" />
        </Menu.Item>
      )}
    </Menu.Menu>
  </Menu>
);

NavBar.propTypes = {
  showLogin: PropTypes.bool,
  handleLogin: PropTypes.func,
  handleLogoff: PropTypes.func,
  handleAdd: PropTypes.func,
  emailAddress: PropTypes.string,
};

export default NavBar;
