import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {
  isLoaded,
  useFirestoreConnect,
} from 'react-redux-firebase';
import {
  Message,
  Icon,
  Table,
  Header,
} from 'semantic-ui-react';
import { brewOptions } from '../consts';

export default function Brews(
  {
    onHandleEdit,
  },
) {
  const brews = useSelector((state) => state.firestore.ordered.publicBrews);
  const publicConfig = [{
    collection: 'brews',
    orderBy: ['createdAt', 'desc'],
    where: ['isPublic', '==', true],
    storeAs: 'publicBrews',
  }];
  useFirestoreConnect(() => (publicConfig));

  if (!isLoaded(brews)) {
    return (
      <Message icon>
        <Icon name="circle notched" loading />
        <Message.Content>
          <Message.Header>Loading Public Brews</Message.Header>
            Please wait while we fetch your data.
        </Message.Content>
      </Message>
    );
  }

  return (
    <>
      <Header as="h2" content="Public Brews" />

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
              onClick={(e) => onHandleEdit(e, brew, true)}
            >
              <Table.Cell
                content={brew.data.title || ''}
              />
              <Table.Cell
                content={brew.data.startDate || ''}
              />
              <Table.Cell
                content={brew.data.brewType ? brewOptions.find((o) => o.key === brew.data.brewType).text : ''}
              />
              <Table.Cell
                content={brew.data.overview || ''}
              />
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
}

Brews.propTypes = {
  onHandleEdit: PropTypes.func,
  isAuthenticated: PropTypes.bool,
};
