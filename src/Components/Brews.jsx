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
  Table,
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
    <>
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
        selectable
        attached="bottom"
      >
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Start Date</Table.HeaderCell>
            <Table.HeaderCell>Type</Table.HeaderCell>
            <Table.HeaderCell>Short Description</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {brews && brews.map((brew) => (
            <Table.Row
              key={brew.id}
              onClick={isAuthenticated ? (e) => onHandleEdit(e, brew) : () => {}}
            >
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
    </>
  );
}

Brews.propTypes = {
  onHandleEdit: PropTypes.func,
  onHandleAdd: PropTypes.func,
  isAuthenticated: PropTypes.bool,
};
