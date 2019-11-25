import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  Form,
  Grid,
  Message,
} from 'semantic-ui-react';

const opts = [
  // { text: 'Beer', value: 'beer' },
  { key: 'wine', text: 'Wine', value: 'wine' },
  { key: 'mead', text: 'Mead', value: 'mead' },
];

export default function AddBrew(
  {
    open,
    onClose,
    onSubmit,
    addState,
    onSetAddState,
    showAddError,
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
      <Modal.Header content="Add Brew" />
      <Modal.Content>
        <Grid centered columns={2}>
          <Grid.Row>
            <Grid.Column>
              <Form
                onSubmit={onSubmit}
              >
                <Form.Input
                  label="Title"
                  placeholder="My First Brew"
                  required
                  value={addState.title}
                  onChange={(e) => onSetAddState('title', e.target.value)}
                />
                <Form.Select
                  label="Type"
                  options={opts}
                  onChange={(e, option) => onSetAddState('brewType', option.value)}
                  required
                />
                <Form.Input
                  label="Overview"
                  placeholder="A Traditional Mead"
                  value={addState.overview}
                  onChange={(e) => onSetAddState('overview', e.target.value)}
                />
                <Form.Input
                  label="Starting Gravity"
                  placeholder="1.010"
                  value={addState.startingGravity}
                  onChange={(e) => onSetAddState('startingGravity', e.target.value)}
                />
                <Form.Button
                  positive
                  icon="plus"
                  type="submit"
                  content="Add Brew"
                />
              </Form>
              <Message
                error
                visible={showAddError}
                header="Something Went Wrong"
                content="Please check the form contents and try again."
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Modal.Content>
    </Modal>
  );
}

AddBrew.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  onSetAddState: PropTypes.func,
  showAddError: PropTypes.bool,
  addState: PropTypes.object,
};
