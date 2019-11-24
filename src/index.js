import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from "react-redux";
import * as serviceWorker from './serviceWorker';
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from 'redux-thunk'
import { firebaseReducer, getFirebase, ReactReduxFirebaseProvider } from "react-redux-firebase";
import { firestoreReducer, createFirestoreInstance } from "redux-firestore";
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';


const middleware = [
  thunk.withExtraArgument({ getFirebase })
];

const createStoreWithMiddleware = compose(
  applyMiddleware(...middleware),
  typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? () => window.__REDUX_DEVTOOLS_EXTENSION__ : f => f
)(createStore);

const store = createStoreWithMiddleware(combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
}));

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
};

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

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider
      firebase={firebase}
      config={rrfConfig}
      dispatch={store.dispatch}
      createFirestoreInstance={createFirestoreInstance}
    >
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
