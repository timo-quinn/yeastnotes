import React, { Component } from 'react';
import './css/semantic.min.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from "./Home";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Route exact path="/" component={Home} />
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
