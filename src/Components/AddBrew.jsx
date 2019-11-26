import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  Form,
  Grid,
  Message,
  Header,
} from 'semantic-ui-react';
import { DateInput } from 'semantic-ui-calendar-react';
import { brewOptions } from '../consts';

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
        <Grid columns={2} stackable>
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
                  value={addState.title}
                  onChange={(e) => onSetAddState('title', e.target.value)}
                />
                <Form.Select
                  label="Type"
                  options={brewOptions}
                  onChange={(e, option) => onSetAddState('brewType', option.value)}
                  required
                />
                <Form.Field
                  control={DateInput}
                  label="Brew Start Date"
                  value={addState.startDate}
                  iconPosition="left"
                  onChange={(e, date) => onSetAddState('startDate', date.value)}
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
                hidden={!showAddError}
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
