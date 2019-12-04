import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {
  isLoaded,
  useFirestoreConnect,
} from 'react-redux-firebase';
import {
  Message,
  Button,
  Icon,
  Table,
  Header,
} from 'semantic-ui-react';
import { brewOptions } from '../consts';

export default function Brews(
  {
    onHandleEdit,
    onHandleAdd,
  },
) {
  const brews = useSelector((state) => state.firestore.ordered.myBrews);
  const auth = useSelector((state) => state.firebase.auth);
  const authConfig = [{
    collection: 'brews',
    orderBy: ['createdAt', 'desc'],
    where: ['creatorId', '==', auth.uid],
    storeAs: 'myBrews',
  }];
  useFirestoreConnect(() => (authConfig));

  if (!isLoaded(brews)) {
    return (
      <Message icon>
        <Icon name="circle notched" loading />
        <Message.Content>
          <Message.Header>Loading My Brews</Message.Header>
            Please wait while we fetch your data.
        </Message.Content>
      </Message>
    );
  }

  return (
    <>
      <Header as="h2" content="My Brews" />
      <Message
        content={`Logged in as ${auth.email}`}
        attached="top"
      />
      <Table
        selectable
        attached="bottom"
      >
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell content="Title" />
            <Table.HeaderCell content="Start Date" singleLine />
            <Table.HeaderCell content="Type" />
            <Table.HeaderCell content="Short Description" singleLine />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {brews && brews.map((brew) => (
            <Table.Row
              key={brew.id}
              onClick={(e) => onHandleEdit(e, brew)}
            >
              <Table.Cell
                content={brew.data.title || ''}
              />
              <Table.Cell
                singleLine
                content={brew.data.startDate || '[Planned]'}
              />
              <Table.Cell
                singleLine
                content={brew.data.brewType ? brewOptions.find((o) => o.key === brew.data.brewType).text : ''}
              />
              <Table.Cell
                content={brew.data.overview || ''}
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
                size="large"
              />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </>
  );
}

Brews.propTypes = {
  onHandleEdit: PropTypes.func.isRequired,
  onHandleAdd: PropTypes.func.isRequired,
};
