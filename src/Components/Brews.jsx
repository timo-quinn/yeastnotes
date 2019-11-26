import React from 'react';
import { useSelector } from 'react-redux';
import {
  isLoaded,
  isEmpty,
  useFirestoreConnect,
} from 'react-redux-firebase';
import {
  Message,
  Button,
  Icon,
  Table,
  Container,
} from 'semantic-ui-react';

export default function Brews({ onHandleEdit, onHandleAdd }) {
  useFirestoreConnect(() => ['brews']);

  const brews = useSelector((state) => state.firestore.ordered.brews);
  const auth = useSelector((state) => state.firebase.auth);

  if (!isLoaded(brews)) {
    return (
      <Message icon>
        <Icon name="circle notched" loading />
        <Message.Content>
          <Message.Header>Loading Brews</Message.Header>
          Please wait while we fetch your data.
        </Message.Content>
      </Message>
    );
  }

  if (isEmpty(brews) && !isEmpty(auth)) {
    return (
      <Message visible content="No brews added yet!" />
    );
  }

  return (
    <Container>
      <Table unstackable compact>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>Type</Table.HeaderCell>
            <Table.HeaderCell>Overview</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {brews && brews.map((brew) => (
            <Table.Row key={brew.id}>
              <Table.Cell collapsing>
                <Button
                  primary
                  onClick={(e) => onHandleEdit(e, brew)}
                  icon="edit"
                  size="small"
                />
              </Table.Cell>
              <Table.Cell>{brew.data.title}</Table.Cell>
              <Table.Cell>{brew.data.startDate}</Table.Cell>
              <Table.Cell>{brew.data.brewType}</Table.Cell>
              <Table.Cell>{brew.data.overview}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
    <Table.Footer fullWidth>
  <Table.Row>
    <Table.HeaderCell colSpan={5}>
      <Button
        positive
        onClick={(e) => onHandleAdd(e)}
        icon="add"
        content="Add Brew"
        size="small"
      />
    </Table.HeaderCell>
  </Table.Row>
    </Table.Footer>
      </Table>
    </Container>
  );
}
