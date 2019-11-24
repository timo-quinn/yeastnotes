import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'firebase/auth'
import 'firebase/firestore'
import { BrowserRouter, Route } from 'react-router-dom';

import Brews from './Brews';
import Home from "./Home";


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Route exact path="/" component={Home} />
          <Route exact path="/Brews" component={Brews} />
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
