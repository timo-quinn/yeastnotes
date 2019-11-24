import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux'
import {
  isLoaded,
  isEmpty,
  useFirestoreConnect,
} from 'react-redux-firebase'

export default function Brews() {
  useFirestoreConnect([
    { collection: 'brews' },
  ]);

  const brews = useSelector(state => state.firestore.ordered.brews);

  if (!isLoaded(brews)) {
    return <div>Loading...</div>
  }

  if (isEmpty(brews)) {
    return <div>No Brews Added Yet</div>
  }

  return (
    <div>
      <ul>
        {
          Object.keys(brews).map((key, id) => (
            <h1 key={key} id={id}>key</h1>
          ))
        }
      </ul>
    </div>
  )
}
