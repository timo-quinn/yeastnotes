import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  isEmpty, isLoaded, useFirebase, useFirestore,
} from 'react-redux-firebase';
import {
  Message,
  Icon,
  Container,
  Menu,
  Button,
} from 'semantic-ui-react';
import Brews from './Brews';
import AddBrew from './AddBrew';
import EditBrew from './EditBrew';

const defaultAddState = {
  title: '',
  overview: '',
  startingGravity: '',
  brewType: '',
  yeast: '',
  startDate: '',
  ingredients: [],
  logEntries: [],
};

const defaultLogState = {
  logEntryDate: '',
  logType: '',
  content: '',
};

const defaultIngredientState = {
  ingredientName: '',
  ingredientQty: '',
  unitType: '',
};

function Home() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddError, setShowAddError] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showEditError, setShowEditError] = useState(false);
  const [addLogEntryState, setAddLogEntryState] = useState(defaultLogState);
  const [showLogEntryError, setShowLogEntryError] = useState(false);
  const [addIngredientState, setAddIngredientState] = useState(defaultLogState);
  const [showIngredientError, setShowIngredientError] = useState(defaultIngredientState);
  const [addState, setAddState] = useState(defaultAddState);
  const [editState, setEditState] = useState(defaultAddState);

  const firebase = useFirebase();
  const firestore = useFirestore();
  const auth = useSelector((state) => state.firebase.auth);

  const updateState = (key, val, setFunc, state) => setFunc({ ...state, [key]: val });

  const onSetAddState = (key, val) => updateState(key, val, setAddState, addState);
  const onSetEditState = (key, val) => updateState(key, val, setEditState, editState);
  const onSetAddLogState = (key, val) => updateState(key, val, setAddLogEntryState, addLogEntryState);
  const onSetAddIngredientState = (key, val) => updateState(key, val, setAddIngredientState, addIngredientState);

  const onShowAddForm = () => {
    setAddState(defaultAddState);
    setShowAddModal(true);
  };
  const onHideAddForm = () => {
    setAddState(defaultAddState);
    setShowAddModal(false);
    setShowAddError(false);
  };

  const onShowEditForm = (e, brew) => {
    setEditState(brew.data);
    setShowEditModal(true);
  };

  const onHideEditForm = () => {
    setEditState(defaultAddState);
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
    const newLogEntries = [];
    if (editState.logEntries) {
      editState.logEntries.forEach((log) => {
        newLogEntries.push(log);
      });
    }
    newLogEntries.push({ log: addLogEntryState });
    // change the state, but let the save button do the firestore write
    onSetEditState('logEntries', newLogEntries);
  };

  const onAddIngredientsEntry = () => {
    const newIngredients = [];
    if (editState.ingredients) {
      editState.ingredients.forEach((ingr) => {
        newIngredients.push(ingr);
      });
    }
    newIngredients.push({ log: addIngredientState });
    // change the state, but let the save button do the firestore write
    onSetEditState('ingredients', newIngredients);
  };

  if (!isLoaded(auth)) {
    return (
      <>
        <Menu
          fixed="top"
          borderless
        >
          <Container>
            <Menu.Item>
              <img alt="" src="/logo-simple.png" />
            </Menu.Item>
            <Menu.Item header>Yeast Notes</Menu.Item>
          </Container>
        </Menu>
        <Container text style={{ marginTop: '4em' }}>
          <Message icon>
            <Icon name="circle notched" loading />
            <Message.Content>
              <Message.Header>Checking Authentication Status</Message.Header>
              Please wait while we check your authentication status.
            </Message.Content>
          </Message>
        </Container>
      </>
    );
  }

  return (
    <>
      <Menu
        fixed="top"
        borderless
      >
        <Container>
          <Menu.Item>
            <img alt="" src="/logo-simple.png" />
          </Menu.Item>
          <Menu.Item header>Yeast Notes</Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item>
              {!isEmpty(auth) ? (
                <Button
                  onClick={() => firebase.logout()}
                  icon="log out"
                  content="Log Out"
                />
              ) : (
                <Button
                  primary
                  icon="google"
                  onClick={() => firebase.login({ provider: 'google', type: 'popup' })}
                  content="Log In With Google"
                />
              )}
            </Menu.Item>
          </Menu.Menu>
        </Container>
      </Menu>


      <Container text style={{ marginTop: '4em' }}>
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
          onSetAddLogState={onSetAddLogState}
          addLogEntryState={addLogEntryState}
          showLogEntryError={showLogEntryError}
          onAddIngredientsEntry={onAddIngredientsEntry}
          onSetAddIngredientState={onSetAddIngredientState}
          addIngredientState={addIngredientState}
          showIngredientError={showIngredientError}
        />
        {isLoaded(auth) && (
          <Brews
            onHandleEdit={onShowEditForm}
            onHandleAdd={onShowAddForm}
            isAuthenticated={!isEmpty(auth)}
          />
        )}
      </Container>
    </>
  );
}

export default Home;
