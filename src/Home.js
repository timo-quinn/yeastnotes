import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  isEmpty, isLoaded, useFirebase, useFirestore,
} from 'react-redux-firebase';
import { Message, Icon, Container } from 'semantic-ui-react';
import NavBar from './Components/NavBar';
import Brews from './Brews';
import AddBrew from './Components/AddBrew';

function Home() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState('');
  const [overview, setOverview] = useState('');
  const [brewType, setBrewType] = useState('');
  const [startingGravity, setStartingGravity] = useState('');

  const firebase = useFirebase();
  const firestore = useFirestore();
  const auth = useSelector((state) => state.firebase.auth);

  const onShowAddForm = () => {
    setShowAddModal(true);
  };

  const onHideAddForm = () => {
    setShowAddModal(false);
  };

  const onSubmitAdd = () => {
    if (!brewType) {
      console.log('missing type');
    } else {
      firestore.add('brews', {
        title,
        overview,
        brewType,
        startingGravity,
        creatorId: auth.uid,
        createdAt: Date.now(),
      });
    }
  };

  return (
    <Container>
      <NavBar
        handleLogin={() => firebase.login({ provider: 'google', type: 'popup' })}
        handleAdd={onShowAddForm}
        showLogin={isEmpty(auth)}
        handleLogoff={() => firebase.logout()}
        emailAddress={!isEmpty(auth) ? auth.email : 'Unknown Email Address'}
      />
      <Message icon hidden={isLoaded(auth)}>
        <Icon name="circle notched" loading />
        <Message.Content>
          <Message.Header>Loading App</Message.Header>
          Please wait while the application loads.
        </Message.Content>
      </Message>
      <Message
        hidden={!isLoaded(auth) || !isEmpty(auth)}
        content="Yeast Notes is read-only until you log in."
      />
      {isLoaded(auth) && (<Brews />)}
      <AddBrew
        open={showAddModal}
        onClose={onHideAddForm}
        onSubmit={onSubmitAdd}
        title={title}
        setTitle={setTitle}
        overview={overview}
        setOverview={setOverview}
        brewType={brewType}
        setBrewType={setBrewType}
        startingGravity={startingGravity}
        setStartingGravity={setStartingGravity}
      />
    </Container>
  );
}

export default Home;
