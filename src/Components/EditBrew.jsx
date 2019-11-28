import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  Form,
  Grid,
  Accordion,
  Header,
  Icon,
  Table,
  Divider,
  Message,
} from 'semantic-ui-react';
import { DateInput } from 'semantic-ui-calendar-react';
import { brewOptions, logOptions } from '../consts';

export default function EditBrew(
  {
    open,
    onClose,
    onSubmit,
    editState,
    onSetEditState,
    showEditError,
    onAddLogEntry,
    onSetAddLogState,
    addLogEntryState,
    showLogEntryError,
    onAddIngredientsEntry,
    onSetAddIngredientState,
    addIngredientState,
    showIngredientError,
  },
) {
  const [activeIndex, setActiveIndex] = useState('');

  const handleAccordionClick = (e, titleProps) => {
    e.preventDefault();
    setActiveIndex(activeIndex === titleProps.index ? -1 : titleProps.index);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeOnDimmerClick
      closeIcon
      closeOnEscape
      centered={false}
    >
      <Modal.Header content={`Edit ${editState.title}`} />
      <Modal.Content>
        <Grid divided>
          <Grid.Row>
            <Grid.Column>
              <Header as="h4" content="Brew Details" />
              <Divider />
              <Form
                onSubmit={onSubmit}
                size="small"
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
                <Form.Button
                  positive
                  icon="save"
                  type="submit"
                  content="Save"
                />
              </Form>
              <Header as="h4" content="Ingredients" />
              <Divider />
              {editState.ingredients && editState.ingredients.length > 0 ? (
                <Table compact basic="very">
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell content="Name" />
                      <Table.HeaderCell content="Quantity" />
                      <Table.HeaderCell content="Unit" />
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {editState.ingredients.map((i) => (
                      <Table.Row key={i.timestamp}>
                        <Table.Cell content={i.ingredientName} />
                        <Table.Cell content={i.ingredientQty} />
                        <Table.Cell content={i.unitType} />
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              ) : (
                <Message
                  content="Add ingredients with the below form."
                />
              )}

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
                    size="small"
                  >

                    <Form.Input
                      label="Name"
                      required
                      placeholder="Orange Blossom Honey"
                      value={addIngredientState.ingredientName}
                      onChange={(e) => onSetAddIngredientState('ingredientName', e.target.value)}
                    />
                    <Form.Group widths="equal">
                      <Form.Input
                        label="Quantity"
                        required
                        placeholder="2"
                        value={addIngredientState.ingredientQty}
                        onChange={(e) => onSetAddIngredientState('ingredientQty', e.target.value)}
                      />
                      <Form.Input
                        label="Unit"
                        placeholder="Kg"
                        value={addIngredientState.unitType}
                        onChange={(e) => onSetAddIngredientState('unitType', e.target.value)}
                      />
                    </Form.Group>
                    <Form.Button
                      primary
                      size="small"
                      icon="plus"
                      type="submit"
                      content="Add Ingredient"
                    />
                  </Form>
                </Accordion.Content>
              </Accordion>

              <Header as="h4" content="Log" />
              <Divider />
              {editState.logEntries && editState.logEntries.length > 0 ? (
                <Table compact basic="very">
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell content="Date Created" />
                      <Table.HeaderCell content="Log Type" />
                      <Table.HeaderCell content="Content" />
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {editState.logEntries.map((logEntry) => (
                      <Table.Row key={logEntry.timestamp}>
                        <Table.Cell content={logEntry.logEntryDate} />
                        <Table.Cell content={logEntry.logType && logOptions.find((o) => o.key === logEntry.logType).text} />
                        <Table.Cell content={logEntry.content} />
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              ) : (
                <Message
                  content="Add a log entry with the below form."
                />
              )}
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
                    size="small"
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
                        value={addLogEntryState.logEntryDate}
                        onChange={(e, date) => onSetAddLogState('logEntryDate', date.value)}
                      />
                    </Form.Group>
                    <Form.Input
                      label="Content"
                      required
                      placeholder="1.005 Gravity Read"
                      value={addLogEntryState.content}
                      onChange={(e) => onSetAddLogState('content', e.target.value)}
                    />
                    <Form.Button
                      primary
                      size="small"
                      icon="plus"
                      type="submit"
                      content="Add Log Entry"
                    />
                  </Form>
                </Accordion.Content>
              </Accordion>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Modal.Content>
    </Modal>
  );
}

EditBrew.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  editState: PropTypes.object,
  onSetEditState: PropTypes.func,
  onAddLogEntry: PropTypes.func,
  onSetAddLogState: PropTypes.func,
};
