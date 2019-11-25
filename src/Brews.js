import React from 'react';
import { useSelector } from 'react-redux'
import {
  isLoaded,
  isEmpty,
  useFirestoreConnect,
} from 'react-redux-firebase'
import { Dimmer, Segment, Loader, Message, Card, Button } from 'semantic-ui-react';

export default function Brews() {
  useFirestoreConnect(() => [ 'brews' ]);

  const brews = useSelector(state => state.firestore.ordered.brews);

  const handleClickView = (e, brew) => {

  };

  const handleClickEdit = (e, brew) => {

  };

  if (!isLoaded(brews)) {
    return (
      <Dimmer active>
        <Loader />
      </Dimmer>
    );
  }

  if (isEmpty(brews)) {
    return (
      <Message visible attached header="No Brews added yet" />
    );
  }

  return (
    <Card.Group>
      {Object.keys(brews).map((key, id) => (
        <Card key={id}>
          <Card.Content>
            <Card.Header>{brews[key].title}</Card.Header>
            <Card.Meta className="mb-2 text-muted">{brews[key].type}</Card.Meta>
            <Card.Description>
              {brews[key].overview}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div className='ui two buttons'>
              <Button primary onClick={(e) => handleClickView(e, brews[key])}>
                View
              </Button>
              <Button secondary onClick={(e) => handleClickEdit(e, brews[key])}>
                Edit
              </Button>
            </div>
          </Card.Content>
        </Card>
      ))}
    </Card.Group>
  )
}
