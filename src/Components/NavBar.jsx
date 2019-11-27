import React from 'react';
import PropTypes from 'prop-types';
import {
  Menu,
  Button,
  Segment,
  Container,
} from 'semantic-ui-react';

const NavBar = (props) => (
  <Segment
    inverted
    textAlign="center"
    style={{ padding: '0em 0em' }}
    vertical
  >
    <Menu
      fixed="top"
      inverted
      borderless
    >
      <Container>
        <Menu.Item>
          <img alt="" src="/logo-simple.png" />
        </Menu.Item>
        <Menu.Item header>Yeast Notes</Menu.Item>
        <Menu.Menu position="right">
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
      </Container>
    </Menu>
  </Segment>
);

NavBar.propTypes = {
  showLogin: PropTypes.bool,
  handleLogin: PropTypes.func,
  handleLogoff: PropTypes.func,
  handleAdd: PropTypes.func,
  emailAddress: PropTypes.string,
};

export default NavBar;
