import React from 'react';
// import { useSelector } from 'react-redux'
// import { useFirestore } from 'react-redux-firebase'
import {
  Modal,
  Form,
  Grid,
} from 'semantic-ui-react';

const opts = [
  // { text: 'Beer', value: 'beer' },
  { text: 'Wine', value: 'wine' },
  { text: 'Mead', value: 'mead' },
];

export default function AddBrew({ open, onClose, onSubmit, title }) {
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
                  placeholder="My First Mead"
                  required
                />
                <Form.Select
                  label="Type"
                  options={opts}
                  required
                />
                <Form.Input
                  label="Overview"
                  placeholder="A Traditional Mead"
                  required
                />
                <Form.Input
                  label="Starting Gravity"
                  placeholder="1.010"
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
  )
}
