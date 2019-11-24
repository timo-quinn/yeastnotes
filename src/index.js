import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from "react-redux";
import * as serviceWorker from './serviceWorker';
import { applyMiddleware, combineReducers, createStore } from "redux";
import reduxThunk from 'redux-thunk';
import { firebaseReducer, ReactReduxFirebaseProvider } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

import * as firebase from "firebase";

firebase.initializeApp({
  apiKey: "AIzaSyD6KVv1hcgQACzFllxM_RQRI3F8OtxPKHU",
  authDomain: "yeast-notes.firebaseapp.com",
  databaseURL: "https://yeast-notes.firebaseio.com",
  projectId: "yeast-notes",
  storageBucket: "yeast-notes.appspot.com",
  messagingSenderId: "274927499497",
  appId: "1:274927499497:web:9b0ea97f5b293e634ed878",
  measurementId: "G-MYJYLRG9ZQ"
});

firebase.firestore();

const store = createStore(
  combineReducers({
      firebase: firebaseReducer,
      firestore: firestoreReducer,
  }),
  {},
  applyMiddleware(reduxThunk)
);

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
};

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider firebase={firebase} config={rrfConfig} dispatch={store.dispatch}>
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
