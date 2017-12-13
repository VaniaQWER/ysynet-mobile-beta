import React, { Component } from 'react';
import { Router, hashHistory } from 'react-router';
import { routes } from './router';
import './index.css';

class App extends Component {
  render() {
    return (
      <Router 
        history={hashHistory}
        routes={routes}
        onUpdate={() => {
          window.scrollTo(0, 0);
        }}
      >
      </Router> 
    );
  }
}

export default App;
