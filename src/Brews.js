import React from 'react';
import { useSelector } from 'react-redux'
import {
  isLoaded,
  isEmpty,
  useFirestoreConnect,
} from 'react-redux-firebase'
import { Message, Card, Button, Icon } from 'semantic-ui-react';

export default function Brews() {
  useFirestoreConnect(() => [ 'brews' ]);

  const brews = useSelector(state => state.firestore.ordered.brews);
  const auth = useSelector(state => state.firebase.auth);

  const handleClickView = (e, brew) => {
    e.preventDefault();
    console.log(brew);
  };

  const handleClickEdit = (e, brew) => {
    e.preventDefault();
    console.log(brew);
  };

  if (!isLoaded(brews)) {
    return (
      <Message icon>
        <Icon name='circle notched' loading />
        <Message.Content>
          <Message.Header>Loading Brews</Message.Header>
          Please wait while we fetch your data.
        </Message.Content>
      </Message>
    );
  }

  if (isEmpty(brews) && !isEmpty(auth)) {
    return (
      <Message warning visible attached content="No brews added yet!" />
    );
  }

  return (
    <Card.Group>
      {brews && brews.map((brew, id) => (
        <Card key={id}>
          <Card.Content>
            <Card.Header>{brew.title}</Card.Header>
            <Card.Meta className="mb-2 text-muted">{brew.type}</Card.Meta>
            <Card.Description>
              {brew.overview}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div className='ui two buttons'>
              <Button primary onClick={(e) => handleClickView(e, brew)}>
                View
              </Button>
              <Button secondary onClick={(e) => handleClickEdit(e, brew)}>
                Edit
              </Button>
            </div>
          </Card.Content>
        </Card>
      ))}
    </Card.Group>
  )
}
