import React from 'react';
import PropTypes from 'prop-types';
// import { useSelector } from 'react-redux'
// import { useFirestore } from 'react-redux-firebase'
import {
  Modal,
  Form,
  Grid,
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
    title,
    setTitle,
    overview,
    setOverview,
    brewType,
    setBrewType,
    startingGravity,
    setStartingGravity,
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
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Form.Select
                  label="Type"
                  options={opts}
                  onChange={(e, option) => setBrewType(option.value)}
                  required
                />
                <Form.Input
                  label="Overview"
                  placeholder="A Traditional Mead"
                  value={overview}
                  onChange={(e) => setOverview(e.target.value)}
                />
                <Form.Input
                  label="Starting Gravity"
                  placeholder="1.010"
                  value={startingGravity}
                  onChange={(e) => setStartingGravity(e.target.value)}
                />
                <Form.Button
                  positive
                  icon="plus"
                  type="submit"
                  content="Add Brew"
                />
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Modal.Content>
    </Modal>
  );
}

AddBrew.propTypes = {
  open: PropTypes.bool,
};
