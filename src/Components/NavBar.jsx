import React from 'react';
import PropTypes from 'prop-types';
import {
  Menu,
  Button,
  Responsive,
  Segment,
  Container,
  Dropdown,
} from 'semantic-ui-react';

const NavBar = (props) => (
  <Segment
    inverted
    textAlign="center"
    style={{ padding: '0em 0em' }}
    vertical
  >
    <Container>
        <Responsive minWidth={768}>
        <Menu
          fixed="top"
          inverted
          borderless
        >
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
        </Menu>
      </Responsive>
      <Responsive maxWidth={767}>
        <Menu
          fixed="top"
          inverted
          borderless
        >
          <Menu.Item>
            <img alt="" src="/logo-simple.png" />
          </Menu.Item>
          <Menu.Item header>Yeast Notes</Menu.Item>
          <Menu.Menu position="right">
            <Dropdown icon="bars" item>
              <Dropdown.Menu>
                {!props.showLogin && (
                  <Dropdown.Item content="Log Out" icon="log out" onClick={props.handleLogoff} />
                )}
                {props.showLogin && (
                  <Dropdown.Item content="Log In With Google" icon="google" onClick={props.handleLogin} />
                )}
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
        </Menu>
      </Responsive>
    </Container>
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
