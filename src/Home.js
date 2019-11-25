import React from "react";
import { useSelector } from "react-redux";
import { isEmpty, isLoaded, useFirebase } from "react-redux-firebase";
import { Message, Segment, Icon, Container } from 'semantic-ui-react';
import NavBar from "./Components/NavBar";
import Brews from "./Brews";

function Home () {
  const firebase = useFirebase();
  const auth = useSelector(state => state.firebase.auth);

  return (
    <Container>
      <NavBar
        handleLogin={() => firebase.login({ provider: 'google', type: 'popup' })}
        handleAdd={() => { console.log('add') }}
        showLogin={isEmpty(auth)}
        handleLogoff={() => firebase.logout()}
        emailAddress={!isEmpty(auth) ? auth.email : 'Unknown Email Address'}
      />
      {!isLoaded(auth) && (
        <Message icon>
          <Icon name='circle notched' loading />
          <Message.Content>
            <Message.Header>Loading App</Message.Header>
            Please wait while the application loads.
          </Message.Content>
        </Message>
      )}
      {isLoaded(auth) && isEmpty(auth) && (
        <Message visible content="Yeast Notes is read-only until you log in." />
      )}
      {isLoaded(auth) && (<Brews />)}
    </Container>
  )
}

export default Home;
