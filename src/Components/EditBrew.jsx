import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  Button,
  Form,
  Grid,
  Header,
} from 'semantic-ui-react';

const opts = [
  // { text: 'Beer', value: 'beer' },
  { key: 'wine', text: 'Wine', value: 'wine' },
  { key: 'mead', text: 'Mead', value: 'mead' },
];

export default function EditBrew(
  {
    open,
    onClose,
    onSubmit,
    editState,
    onSetEditState,
    onAddLogEntry,
  },
) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeOnDimmerClick
      closeIcon
      closeOnEscape
      onActionClick={onSubmit}
      size="small"
    >
      <Modal.Header content={`Edit ${editState.title}`} />
      <Modal.Content>
        <Grid centered columns={2}>
          <Grid.Row>
            <Grid.Column>
              <Header as="h4" content="Brew Details" />
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
                <Form.Select
                  label="Type"
                  options={opts}
                  defaultValue={editState.brewType}
                  onChange={(e, option) => onSetEditState('brewType', option.value)}
                  required
                />
                <Form.Input
                  label="Overview"
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
              <Form
                onSubmit={onSubmit}
              >
                {editState.logEntries && editState.logEntries.map((logEntry) => <Form.TextArea
                  />)}
              </Form>
              <Button
                positive
                basic
                icon="plus"
                onClick={onAddLogEntry}
                content="Add Log Entry"
              />
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
};
