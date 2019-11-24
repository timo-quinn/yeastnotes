import React from 'react';
import { useSelector } from 'react-redux'
import {
  isLoaded,
  isEmpty,
  useFirestoreConnect,
} from 'react-redux-firebase'
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import Row from "react-bootstrap/Row";

export default function Brews() {
  useFirestoreConnect(() => [ 'brews' ]);

  const brews = useSelector(state => state.firestore.ordered.brews);

  console.log(brews);

  const handleClickView = (e, brew) => {

  };

  const handleClickEdit = (e, brew) => {

  };

  if (!isLoaded(brews)) {
    return (
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  }

  if (isEmpty(brews)) {
    return (
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <h3>No Brews added yet</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  }

  return (
    <Row>
      <Col>
        {Object.keys(brews).map((brew) => (
          <Card key={brew.key}>
            <Card.Body>
              <Card.Title>{brew.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{brew.type}</Card.Subtitle>
              <Card.Text>
                {brew.overview}
              </Card.Text>
              <Card.Link onClick={(e) => handleClickView(e, brew)}>View</Card.Link>
              <Card.Link onClick={(e) => handleClickEdit(e, brew)}>Edit</Card.Link>
            </Card.Body>
          </Card>
        ))}
      </Col>
    </Row>
  )
}
