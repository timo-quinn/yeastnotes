import React from 'react';
import { useSelector } from 'react-redux'
import { useFirestore } from 'react-redux-firebase'
import { Modal, Button, Form } from 'semantic-ui-react';

export default function AddBrew({ open, onClose, onSubmit }) {
  const firestore = useFirestore();

  const handleClickSave = (e, brew) => {
    e.preventDefault();
    console.log(brew);
    firestore.add('brews', {});
  };

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
          <Form.Button positive icon="plus" type="submit" content="Add Brew" />
        </Form>
      </Modal.Content>
    </Modal>
  )
}
