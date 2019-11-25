import React from 'react';
// import { useSelector } from 'react-redux'
// import { useFirestore } from 'react-redux-firebase'
import { Modal, Form } from 'semantic-ui-react';

const opts = [
  { text: 'Beer', value: 'beer' },
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
        <Form
          onSubmit={onSubmit}
        >
          <Form.Input
            label="Title"
            required
          />
          <Form.Select
            label="Type"
            options={opts}
            required
          />
          <Form.Input
            label="Overview"
            required
          />
          <Form.Button
            positive
            icon="plus"
            type="submit"
            content="Add Brew"
          />
        </Form>
      </Modal.Content>
    </Modal>
  )
}
