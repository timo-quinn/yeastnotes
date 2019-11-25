import React from "react";
import { useSelector } from "react-redux";
import { isEmpty, isLoaded, useFirebase } from "react-redux-firebase";
import {Dimmer, Segment, Loader, Message, Container} from 'semantic-ui-react';
import NavBar from "./Components/NavBar";
import Brews from "./Brews";

function Home () {
  const firebase = useFirebase();
  const auth = useSelector(state => state.firebase.auth);

  return (
    <Container>
      <NavBar
        handleLogin={() => firebase.login({ provider: 'google', type: 'popup' })}
        showLogin={isEmpty(auth)}
        handleLogoff={() => firebase.logout()}
        emailAddress={!isEmpty(auth) ? auth.email : ''}
      />
      {!isLoaded(auth) && (
        <Dimmer active>
          <Loader />
        </Dimmer>
      )}
      {isEmpty(auth) && (
        <Message visible content="Yeast Notes is read-only until you log in." />
      )}
      <Brews />
    </Container>
  )
}

export default Home;
