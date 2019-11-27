import React from 'react';
import PropTypes from 'prop-types';
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
  Segment,
  Table,
  Container,
} from 'semantic-ui-react';
import { brewOptions } from '../consts';

export default function Brews(
  {
    onHandleEdit,
    onHandleAdd,
    isAuthenticated,
  },
) {
  const brews = useSelector((state) => state.firestore.ordered.brews);
  const auth = useSelector((state) => state.firebase.auth);
  const queryConfig = isAuthenticated ? {
    collection: 'brews',
    orderBy: ['createdAt', 'desc'],
    where: ['creatorId', '==', auth.uid],
  } : {
    collection: 'brews',
    orderBy: ['createdAt', 'desc'],
    where: ['isPublic', '==', true],
  };
  useFirestoreConnect(() => (queryConfig));

  if (!isLoaded(brews)) {
    return (
      <Segment basic>
        <Container>
          <Message icon>
            <Icon name="circle notched" loading />
            <Message.Content>
              <Message.Header>Loading Brews</Message.Header>
              Please wait while we fetch your data.
            </Message.Content>
          </Message>
        </Container>
      </Segment>
    );
  }

  if (isEmpty(brews) && !isEmpty(auth)) {
    return (
      <Segment basic>
        <Container>
          <Message visible content="No brews added yet!" />
        </Container>
      </Segment>
    );
  }

  return (
    <Segment basic>
      <Container>
        <Message
          hidden={isAuthenticated}
          content="Yeast Notes is read-only until you log in."
          attached="top"
        />
        <Message
          hidden={!isAuthenticated}
          content={`Logged in as ${auth.email}`}
          attached="top"
        />
        <Table
          compact
          unstackable
          attached="bottom"
        >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Start Date</Table.HeaderCell>
              <Table.HeaderCell>Type</Table.HeaderCell>
              <Table.HeaderCell>Short Description</Table.HeaderCell>
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
                    disabled={!isAuthenticated}
                  />
                </Table.Cell>
                <Table.Cell
                  content={brew.data.title}
                />
                <Table.Cell
                  content={brew.data.startDate}
                />
                <Table.Cell
                  content={brew.data.brewType && brewOptions.find((o) => o.key === brew.data.brewType).text}
                />
                <Table.Cell
                  content={brew.data.overview}
                />
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
                  disabled={!isAuthenticated}
                />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </Container>
    </Segment>
  );
}

Brews.propTypes = {
  onHandleEdit: PropTypes.func,
  onHandleAdd: PropTypes.func,
  isAuthenticated: PropTypes.bool,
};
