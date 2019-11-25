import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  isEmpty, isLoaded, useFirebase, useFirestore,
} from 'react-redux-firebase';
import { Message, Icon, Container } from 'semantic-ui-react';
import NavBar from './Components/NavBar';
import Brews from './Components/Brews';
import AddBrew from './Components/AddBrew';
import EditBrew from './Components/EditBrew';

const defaultAddState = {
  title: '',
  overview: '',
  startingGravity: '',
  brewType: '',
};

const defaultEditState = {
  title: '',
  overview: '',
  startingGravity: '',
  brewType: '',
};

function Home() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [addState, setAddState] = useState(defaultAddState);
  const [editState, setEditState] = useState(defaultEditState);

  const firebase = useFirebase();
  const firestore = useFirestore();
  const auth = useSelector((state) => state.firebase.auth);

  const onSetAddState = (key, val) => { setAddState({ ...addState, [key]: val })};

  const onShowAddForm = () => {
    setAddState(defaultAddState);
    setShowAddModal(true)
  };
  const onHideAddForm = () => {
    setAddState(defaultAddState);
    setShowAddModal(false)
  };

  const onSetEditState = (key, val) => { setEditState({ ...editState, [key]: val })};

  const onShowEditForm = (e, brew) => {
    console.log(brew);
    setEditState(brew);
    setShowEditModal(true);
  };

  const onHideEditForm = () => {
    setEditState(defaultEditState);
    setShowEditModal(false);
  };

  const onSubmitAdd = () => {
    if (addState.brewType === '') {
      console.log('missing type');
    } else {
      firestore.add(
        'brews',
        {
          ...addState,
        creatorId: auth.uid,
        createdAt: Date.now(),
      });
    }
  };

  const onSubmitEdit = () => {
    if (addState.brewType === '') {
      console.log('missing type');
    } else {
      firestore.update(
        'brews',
        {
          ...addState,
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
      {isLoaded(auth) && (<Brews onHandleEdit={onShowEditForm} />)}
      <AddBrew
        open={showAddModal}
        onClose={onHideAddForm}
        onSubmit={onSubmitAdd}
        addState={addState}
        onSetAddState={onSetAddState}
      />
      <EditBrew
        open={showEditModal}
        onClose={onHideEditForm}
        onSubmit={onSubmitEdit}
        editState={editState}
        onSetEditState={onSetEditState}
      />
    </Container>
  );
}

export default Home;
