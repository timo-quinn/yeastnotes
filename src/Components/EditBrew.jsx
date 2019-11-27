import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  Form,
  Grid,
  Header,
  Table,
  Divider,
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
  },
) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeOnDimmerClick
      closeIcon
      closeOnEscape
    >
      <Modal.Header content={`Edit ${editState.title}`} />
      <Modal.Content>
        <Grid centered columns={2} divided>
          <Grid.Row>
            <Grid.Column>
              <Header as="h4" content="Brew Details" />
              <Divider />
              <Form
                onSubmit={onSubmit}
              >
                <Form.Input
                  label="Title"
                  placeholder="My First Brew"
                  required
                  value={editState.title}
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
                    value={editState.startDate}
                    iconPosition="left"
                    onChange={(e, date) => onSetEditState('editState', date.value)}
                  />
                </Form.Group>
                <Form.Input
                  label="Short Description"
                  placeholder="A Traditional Mead"
                  value={editState.overview}
                  onChange={(e) => onSetEditState('overview', e.target.value)}
                />
                <Form.Input
                  label="Starting Gravity"
                  placeholder="1.010"
                  value={editState.startingGravity}
                  onChange={(e) => onSetEditState('startingGravity', e.target.value)}
                />
                <Form.Button
                  positive
                  icon="save"
                  type="submit"
                  content="Save"
                />
              </Form>
            </Grid.Column>
            <Grid.Column>
              <Header as="h4" content="Log" />
              <Divider />
              {editState.logEntries && editState.logEntries.length > 0 && (
                <Table compact basic="very">
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>
                        Date Created
                      </Table.HeaderCell>
                      <Table.HeaderCell>
                        Log Type
                      </Table.HeaderCell>
                      <Table.HeaderCell>
                        Content
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {editState.logEntries.map((logEntry) => (
                      <Table.Row>
                        <Table.Cell>
                          {logEntry.dateCreated}
                        </Table.Cell>
                        <Table.Cell>
                          {logEntry.logType}
                        </Table.Cell>
                        <Table.Cell>
                          {logEntry.logContent}
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              )}
              <Form
                onSubmit={onSubmit}
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
                    label="Log Entry Date"
                    iconPosition="left"
                    value={addLogEntryState.logEntryDate}
                    onChange={(e, date) => onSetAddLogState('logEntryDate', date.value)}
                  />
                </Form.Group>
                <Form.Input
                  label="Content"
                  placeholder="1.005 Gravity Read"
                  value={addLogEntryState.content}
                  onChange={(e) => onSetAddLogState('content', e.target.value)}
                />
                <Form.Button
                  positive
                  basic
                  icon="plus"
                  onClick={onAddLogEntry}
                  content="Add Log Entry"
                />
              </Form>
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
