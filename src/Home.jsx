import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  isEmpty, isLoaded, useFirebase, useFirestore,
} from 'react-redux-firebase';
import {
  Message,
  Icon,
  Segment, Divider,
} from 'semantic-ui-react';
import NavBar from './Components/NavBar';
import Brews from './Components/Brews';
import AddBrew from './Components/AddBrew';
import EditBrew from './Components/EditBrew';

const defaultAddState = {
  title: '',
  overview: '',
  startingGravity: '',
  brewType: '',
  startDate: '',
};

const defaultEditState = {
  title: '',
  overview: '',
  startingGravity: '',
  brewType: '',
  startDate: '',
};

function Home() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddError, setShowAddError] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showEditError, setShowEditError] = useState(false);
  const [addState, setAddState] = useState(defaultAddState);
  const [editState, setEditState] = useState(defaultEditState);

  const firebase = useFirebase();
  const firestore = useFirestore();
  const auth = useSelector((state) => state.firebase.auth);

  const onSetAddState = (key, val) => { setAddState({ ...addState, [key]: val }); };

  const onShowAddForm = () => {
    setAddState(defaultAddState);
    setShowAddModal(true);
  };
  const onHideAddForm = () => {
    setAddState(defaultAddState);
    setShowAddModal(false);
    setShowAddError(false);
  };

  const onSetEditState = (key, val) => { setEditState({ ...editState, [key]: val }); };

  const onShowEditForm = (e, brew) => {
    console.log(brew);
    setEditState(brew.data);
    setShowEditModal(true);
  };

  const onHideEditForm = () => {
    setEditState(defaultEditState);
    setShowEditModal(false);
    setShowEditError(false);
  };

  const onSubmitAdd = () => {
    setShowAddError(false);
    if (!addState.brewType) {
      console.log('missing type');
      setShowAddError(true);
    } else {
      firestore.add(
        'brews',
        {
          data: addState,
          creatorId: auth.uid,
          createdAt: Date.now(),
        },
      ).then(() => {
        setShowAddModal(false);
      }).catch((error) => {
        console.error(error);
        setShowAddError(true);
      });
    }
  };

  const onSubmitEdit = () => {
    setShowEditError(false);
    if (!addState.brewType) {
      console.log('missing type');
      setShowEditError(true);
    } else {
      firestore.update(
        'brews',
        {
          data: editState,
          updatedAt: Date.now(),
        },
      ).then(() => {
        setShowEditModal(false);
      }).catch((error) => {
        console.error(error);
        setShowEditError(true);
      });
    }
  };

  const onAddLogEntry = () => {

  };

  return (
    <div>
      <NavBar
        handleLogin={() => firebase.login({ provider: 'google', type: 'popup' })}
        showLogin={isEmpty(auth)}
        handleLogoff={() => firebase.logout()}
        emailAddress={!isEmpty(auth) ? auth.email : 'Unknown Email Address'}
      />
      <Divider hidden />
      <Divider hidden />
      <Divider hidden />
      <Segment basic>
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
        {isLoaded(auth) && (<Brews onHandleEdit={onShowEditForm} onHandleAdd={onShowAddForm} />)}
        <AddBrew
          open={showAddModal}
          onClose={onHideAddForm}
          onSubmit={onSubmitAdd}
          addState={addState}
          onSetAddState={onSetAddState}
          showAddError={showAddError}
        />
        <EditBrew
          open={showEditModal}
          onClose={onHideEditForm}
          onSubmit={onSubmitEdit}
          editState={editState}
          onSetEditState={onSetEditState}
          showEditError={showEditError}
          onAddLogEntry={onAddLogEntry}
        />
      </Segment>
    </div>
  );
}

export default Home;
