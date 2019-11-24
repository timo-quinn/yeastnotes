import React from "react";
import { useSelector } from "react-redux";
import GoogleButton from 'react-google-button'
import { isEmpty, isLoaded, useFirebase } from "react-redux-firebase";

function Home () {
  const firebase = useFirebase();
  const auth = useSelector(state => state.firebase.auth);

  const loginWithGoogle = () => firebase.login({ provider: 'google', type: 'popup' });

  return !isLoaded(auth) ? <h3>Loading...</h3> : (
    <div>
      <h2>Home</h2>
      <p>Yeast Notes is a simple brewing log book.</p>
      {isEmpty(auth) ? (
        <GoogleButton onClick={loginWithGoogle} />
        ) : (
          <pre>
            {JSON.stringify(auth, null, 2)}
          </pre>
      )}
    </div>
  )
}

export default Home;
