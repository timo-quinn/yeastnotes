import React from 'react';
import './css/semantic.min.css';
import './Site.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './Home';

const App = () => (
  <BrowserRouter>
    <Route exact path="/" component={Home} />
  </BrowserRouter>
);

export default App;
