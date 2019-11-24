import React from "react";
import { useSelector } from "react-redux";
import { isEmpty, isLoaded, useFirebase } from "react-redux-firebase";
import NavBar from "./Components/NavBar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import Brews from "./Brews";
import Alert from "react-bootstrap/Alert";

function Home () {
  const firebase = useFirebase();
  const auth = useSelector(state => state.firebase.auth);

  return (
    <div>
      <NavBar
        handleLogin={() => firebase.login({ provider: 'google', type: 'popup' })}
        showLogin={isEmpty(auth)}
        handleLogoff={() => firebase.logout()}
        emailAddress={!isEmpty(auth) ? auth.email : ''}
      />
      <Container>
        {!isLoaded(auth) && (
          <Row>
            <Col>
              <Card>
                <Card.Body>
                  <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                  </Spinner>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
        {isEmpty(auth) && (
          <Row>
            <Col>
              <Alert variant="info">
                Yeast Notes is read-only until you log in.
              </Alert>
            </Col>
          </Row>
        )}
        <Brews />
      </Container>
    </div>
  )
}

export default Home;
