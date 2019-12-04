import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  isEmpty,
  isLoaded,
  useFirebase,
  useFirestore,
} from 'react-redux-firebase';
import {
  Message,
  Icon,
  Container,
  Divider,
  Table,
  Accordion,
  Modal,
  Header,
  Grid,
  Form,
  Menu,
  Button,
} from 'semantic-ui-react';
import { DateInput } from 'semantic-ui-calendar-react';
import MyBrews from './MyBrews';
import PublicBrews from './PublicBrews';
import { brewOptions, logOptions } from '../consts';

const defaultState = {
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
  timestamp: '',
  logEntryDate: '',
  logType: '',
  content: '',
};

const defaultIngredientState = {
  timestamp: '',
  ingredientName: '',
  ingredientQty: '',
  unitType: '',
};

function Home() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddError, setShowAddError] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showEditError, setShowEditError] = useState(false);
  const [newLogEntry, setNewLogEntry] = useState(defaultLogState);
  const [showLogEntryError, setShowLogEntryError] = useState(false);
  const [newIngredient, setNewIngredient] = useState(defaultIngredientState);
  const [showIngredientError, setShowIngredientError] = useState(false);
  const [addState, setAddState] = useState(defaultState);
  const [editState, setEditState] = useState(defaultState);
  const [selectedBrew, setSelectedBrew] = useState(undefined);
  const [selectedId, setSelectedId] = useState(-1);
  const [activeIndex, setActiveIndex] = useState('');
  const [viewOnly, setViewOnly] = useState(true);

  const firebase = useFirebase();
  const firestore = useFirestore();
  const auth = useSelector((state) => state.firebase.auth);
   
  const updateState = (key, val, setFunc, state) => setFunc({ ...state, [key]: val });

  const onSetAddState = (key, val) => updateState(key, val, setAddState, addState);
  const onSetEditState = (key, val) => updateState(key, val, setEditState, editState);
  const onSetAddLogState = (key, val) => updateState(key, val, setNewLogEntry, newLogEntry);
  const onSetAddIngredientState = (key, val) => updateState(key, val, setNewIngredient, newIngredient);

  const calculateAbv = (reading) => {
    try {
      const sg = Number(editState.startingGravity);
      const fg = Number(reading);
      if (!sg || !fg ) {
        return '';
      }
      const abv = (76.08 * (sg - fg) / (1.775 - sg)) * (fg / 0.794);
      return ` (ABV ${abv.toFixed(2)}%)`;
    } catch {
      return '';
    }
  }

  const handleAccordionClick = (e, titleProps) => {
    e.preventDefault();
    setActiveIndex(activeIndex === titleProps.index ? -1 : titleProps.index);
  };

  const onShowAddForm = () => {
    setAddState(defaultState);
    setShowAddModal(true);
  };

  const onHideAddForm = () => {
    setAddState(defaultState);
    setShowAddModal(false);
    setShowAddError(false);
  };

  const onShowEditForm = (e, brew, forceView = false) => {
    setEditState(brew.data);
    setSelectedId(brew.id);
    setSelectedBrew(brew);
    setViewOnly(true);
    if (brew.creatorId === auth.uid) {
      setViewOnly(false);
      if (forceView) {
        setViewOnly(true);
      }
    }
    setShowEditModal(true);
    setShowEditError(false);
  };

  const onHideEditForm = () => {
    setEditState(defaultState);
    setNewLogEntry(defaultLogState);
    setNewIngredient(defaultIngredientState);
    setSelectedId(-1);
    setSelectedBrew(undefined);
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
    if (!editState.brewType) {
      console.log('missing type');
      setShowEditError(true);
    } else {
      firestore.update(
        `brews/${selectedId}`,
        {
          data: editState,
          updatedAt: Date.now(),
        },
      ).then(() => {
        setShowEditModal(false);
        setNewLogEntry(defaultLogState);
        setNewIngredient(defaultIngredientState);
        setSelectedId(-1);
      }).catch((error) => {
        console.error(error);
        setShowEditError(true);
      });
    }
  };

  const onMakePublic = (e) => {
    e.preventDefault();
    firestore.update(
      `brews/${selectedId}`,
      {
        isPublic: true,
        updatedAt: Date.now(),
      },
    ).then(() => {
      setShowEditModal(false);
      setNewLogEntry(defaultLogState);
      setNewIngredient(defaultIngredientState);
      setSelectedId(-1);
    }).catch((error) => {
      console.error(error);
      setShowEditError(true);
    });
  }

  const onAddLogEntry = () => {
    const updatedLogEntries = [];
    if (editState.logEntries) {
      editState.logEntries.forEach((l) => {
        updatedLogEntries.push(l);
      });
    }
    updatedLogEntries.push({ ...newLogEntry, timestamp: Date.now() });
    // change the state, but let the save button do the firestore write
    onSetEditState('logEntries', updatedLogEntries);
  };

  const onAddIngredientsEntry = () => {
    const updatedIngredients = [];
    if (editState.ingredients) {
      editState.ingredients.forEach((i) => {
        updatedIngredients.push(i);
      });
    }
    updatedIngredients.push({ ...newIngredient, timestamp: Date.now() });
    // change the state, but let the save button do the firestore write
    onSetEditState('ingredients', updatedIngredients);
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
        <Modal
          open={showAddModal}
          onClose={onHideAddForm}
          closeOnDimmerClick
          closeIcon
          closeOnEscape
          centered={false}
        >
          <Modal.Header content="Add Brew" />
          <Modal.Content>
            <Grid stackable>
              <Grid.Row>
                <Grid.Column>
                  <Header as="h4" content="Brew Details" />
                  <Form
                    onSubmit={onSubmitAdd}
                    size="large"
                  >
                    <Form.Input
                      label="Title"
                      placeholder="My First Brew"
                      required
                      value={addState.title}
                      onChange={(e) => onSetAddState('title', e.target.value)}
                    />
                    <Form.Group widths="equal">
                      <Form.Select
                        label="Type"
                        options={brewOptions}
                        onChange={(_e, option) => onSetAddState('brewType', option.value)}
                        required
                      />
                      <Form.Field
                        control={DateInput}
                        label="Brew Start Date"
                        value={addState.startDate}
                        iconPosition="left"
                        onChange={(_e, date) => onSetAddState('startDate', date.value)}
                      />
                    </Form.Group>
                    <Form.Input
                      label="Short Description"
                      placeholder="A Traditional Mead"
                      value={addState.overview}
                      onChange={(e) => onSetAddState('overview', e.target.value)}
                    />
                    <Form.Group widths="equal">
                      <Form.Input
                        label="Starting Gravity"
                        placeholder="1.010"
                        value={addState.startingGravity}
                        onChange={(e) => onSetAddState('startingGravity', e.target.value)}
                      />
                      <Form.Input
                        label="Yeast"
                        placeholder="Lalvin EC-1118"
                        value={addState.yeast}
                        onChange={(e) => onSetAddState('yeast', e.target.value)}
                      />
                    </Form.Group>
                    <Form.Button
                      positive
                      icon="plus"
                      type="submit"
                      size="large"
                      content="Add Brew"
                    />
                  </Form>
                  <Message
                    error
                    icon="cancel"
                    visible={showAddError}
                    hidden={!showAddError}
                    header="Something Went Wrong"
                    content="Please check the form contents and try again."
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Modal.Content>
        </Modal>

        <Modal
          open={showEditModal}
          onClose={onHideEditForm}
          closeOnDimmerClick
          closeIcon
          closeOnEscape
          centered={false}
        >
          <Modal.Header content={viewOnly ? `View ${editState.title}` : `Edit ${editState.title}`} />
          <Modal.Content>
            <Grid divided>
              <Grid.Row>
                <Grid.Column>
                  <Header as="h4" content="Brew Details" />
                  <Divider />
                  {viewOnly ? (
                    <Table size="large" compact basic="very">
                      <Table.Header />
                      <Table.Body>
                        {editState.title && (
                          <Table.Row>
                            <Table.Cell singleLine collapsing><b>Title:</b></Table.Cell>
                            <Table.Cell content={editState.title || ''} />
                          </Table.Row>
                        )}
                        {editState.brewType && (
                          <Table.Row>
                            <Table.Cell singleLine><b>Type:</b></Table.Cell>
                            <Table.Cell content={editState.brewType || ''} />
                          </Table.Row>
                        )}
                        {editState.startDate && (
                          <Table.Row>
                            <Table.Cell singleLine><b>Brew Start Date:</b></Table.Cell>
                            <Table.Cell content={editState.startDate || ''} />
                          </Table.Row>
                        )}
                        {editState.overview && (
                          <Table.Row>
                            <Table.Cell singleLine><b>Short Description:</b></Table.Cell>
                            <Table.Cell content={editState.overview || ''} />
                          </Table.Row>
                        )}
                        {editState.startingGravity && (
                          <Table.Row>
                            <Table.Cell singleLine><b>Starting Gravity:</b></Table.Cell>
                            <Table.Cell content={editState.startingGravity || ''} />
                          </Table.Row>
                        )}
                        {editState.yeast && (
                          <Table.Row>
                            <Table.Cell singleLine><b>Yeast:</b></Table.Cell>
                            <Table.Cell content={editState.yeast || ''} />
                          </Table.Row>
                        )}
                      </Table.Body>
                    </Table>
                  ) : (
                    <Form
                      onSubmit={onSubmitEdit}
                      size="large"
                    >
                      <Form.Input
                        label="Title"
                        placeholder="My First Brew"
                        required
                        value={editState.title || ''}
                        onChange={(e) => onSetEditState('title', e.target.value)}
                      />
                      <Form.Group widths="equal">
                        <Form.Select
                          label="Type"
                          options={brewOptions}
                          defaultValue={editState.brewType}
                          onChange={(e, option) => onSetEditState('brewType', option.value)}
                          required
                        />
                        <Form.Field
                          control={DateInput}
                          label="Brew Start Date"
                          value={editState.startDate || ''}
                          iconPosition="left"
                          onChange={(e, date) => onSetEditState('editState', date.value)}
                        />
                      </Form.Group>
                      <Form.Input
                        label="Short Description"
                        placeholder="A Traditional Mead"
                        value={editState.overview || ''}
                        onChange={(e) => onSetEditState('overview', e.target.value)}
                      />
                      <Form.Group widths="equal">
                        <Form.Input
                          label="Starting Gravity"
                          placeholder="1.010"
                          value={editState.startingGravity || ''}
                          onChange={(e) => onSetEditState('startingGravity', e.target.value)}
                        />
                        <Form.Input
                          label="Yeast"
                          placeholder="Lalvin EC-1118"
                          value={editState.yeast || ''}
                          onChange={(e) => onSetEditState('yeast', e.target.value)}
                        />
                      </Form.Group>
                      <Message
                        error
                        visible={showEditError}
                        hidden={!showEditError}
                        icon="cancel"
                        header="Something Went Wrong"
                        content="Please check the form contents and try again."
                      />
                      <Form.Group>
                        <Form.Button
                          positive
                          size="large"
                          icon="save"
                          type="submit"
                          content="Save"
                        />
                        <Form.Button
                          primary
                          onClick={onMakePublic}
                          size="large"
                          icon="eye"
                          content="Make Public"
                        />
                      </Form.Group>

                    </Form>
                  )}
                  
                  <Header as="h4" content="Ingredients" />
                  <Divider />
                  {editState.ingredients && editState.ingredients.length > 0 ? (
                    <Table size="large" compact basic="very">
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell content="Name" />
                          <Table.HeaderCell textAlign="right" content="Quantity" />
                          <Table.HeaderCell textAlign="left" content="Unit" />
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {editState.ingredients.map((i) => (
                          <Table.Row key={i.timestamp}>
                            <Table.Cell content={i.ingredientName} />
                            <Table.Cell textAlign="right" singleLine content={i.ingredientQty} />
                            <Table.Cell textAlign="left" singleLine content={i.unitType} />
                          </Table.Row>
                        ))}
                      </Table.Body>
                    </Table>
                  ) : (
                    <Message
                      content="Add ingredients with the below form."
                    />
                  )}

                  {!viewOnly && (
                    <Accordion fluid styled>
                      <Accordion.Title
                        onClick={handleAccordionClick}
                        index={0}
                        active={activeIndex === 0}
                      >
                        <Icon name="dropdown" />
                        Add Ingredient
                      </Accordion.Title>
                      <Accordion.Content active={activeIndex === 0}>
                        <Form
                          onSubmit={onAddIngredientsEntry}
                          size="large"
                        >
                          <Form.Input
                            label="Name"
                            required
                            placeholder="Orange Blossom Honey"
                            value={newIngredient.ingredientName}
                            onChange={(e) => onSetAddIngredientState('ingredientName', e.target.value)}
                          />
                          <Form.Group widths="equal">
                            <Form.Input
                              label="Quantity"
                              required
                              placeholder="2"
                              value={newIngredient.ingredientQty}
                              onChange={(e) => onSetAddIngredientState('ingredientQty', e.target.value)}
                            />
                            <Form.Input
                              label="Unit"
                              placeholder="Kg"
                              value={newIngredient.unitType}
                              onChange={(e) => onSetAddIngredientState('unitType', e.target.value)}
                            />
                          </Form.Group>
                          <Message
                            error
                            visible={showIngredientError}
                            hidden={!showIngredientError}
                            icon="cancel"
                            header="Something Went Wrong"
                            content="Please check the form contents and try again."
                          />
                          <Form.Button
                            primary
                            size="large"
                            icon="plus"
                            type="submit"
                            content="Add Ingredient"
                          />
                        </Form>
                      </Accordion.Content>
                    </Accordion>
                  )}

                  <Header as="h4" content="Log" />
                  <Divider />
                  {editState.logEntries && editState.logEntries.length > 0 ? (
                    <Table size="large" compact basic="very">
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell textAlign="right" content="Date" />
                          <Table.HeaderCell textAlign="center" content="Log Type" />
                          <Table.HeaderCell content="Content" />
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {editState.logEntries.map((logEntry) => (
                          <Table.Row key={logEntry.timestamp}>
                            <Table.Cell textAlign="right" singleLine content={logEntry.logEntryDate} />
                            <Table.Cell textAlign="center" singleLine content={logEntry.logType && logOptions.find((o) => o.key === logEntry.logType).text} />
                            <Table.Cell content={`${logEntry.content}${calculateAbv(logEntry.content)}`} />
                          </Table.Row>
                        ))}
                      </Table.Body>
                    </Table>
                  ) : (
                    <Message
                      content="Add a log entry with the below form."
                    />
                  )}
                  {!viewOnly && (
                    <Accordion fluid styled>
                      <Accordion.Title
                        onClick={handleAccordionClick}
                        index={1}
                        active={activeIndex === 1}
                      >
                        <Icon name="dropdown" />
                        Add Log Entry
                      </Accordion.Title>
                      <Accordion.Content active={activeIndex === 1}>
                        <Form
                          onSubmit={onAddLogEntry}
                          size="large"
                        >
                          <Form.Group widths="equal">
                            <Form.Select
                              label="Type"
                              options={logOptions}
                              onChange={(e, option) => onSetAddLogState('logType', option.value)}
                              required
                            />
                            <Form.Field
                              control={DateInput}
                              required
                              label="Log Entry Date"
                              iconPosition="left"
                              value={newLogEntry.logEntryDate}
                              onChange={(e, date) => onSetAddLogState('logEntryDate', date.value)}
                            />
                          </Form.Group>
                          <Form.Input
                            label="Content"
                            required
                            placeholder="1.005 Gravity Read"
                            value={newLogEntry.content}
                            onChange={(e) => onSetAddLogState('content', e.target.value)}
                          />
                          <Message
                            error
                            visible={showLogEntryError}
                            hidden={!showLogEntryError}
                            icon="cancel"
                            header="Something Went Wrong"
                            content="Please check the form contents and try again."
                          />
                          <Form.Button
                            primary
                            size="large"
                            icon="plus"
                            type="submit"
                            content="Add Log Entry"
                          />
                        </Form>
                      </Accordion.Content>
                    </Accordion>
                  )}
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Modal.Content>
        </Modal>

        
        {isLoaded(auth) && isEmpty(auth) && (
          <Message
            content="Yeast Notes is read-only until you log in."
            attached="top"
          />
        )}

        {isLoaded(auth) && !isEmpty(auth) && (
          <MyBrews
            onHandleEdit={onShowEditForm}
            onHandleAdd={onShowAddForm}
          />
        )}

        {isLoaded(auth) && (
          <PublicBrews onHandleEdit={onShowEditForm} />
        )}

        <Divider hidden />
      </Container>
    </>
  );
}

export default Home;
