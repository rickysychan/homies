// Application entrypoint.
// You can choose your kind of history here (e.g. browserHistory)
import { Router, browserHistory as history } from 'react-router';
// Your routes.js file
import routes from './routes.jsx';

// Load up the application styles
require("../styles/application.scss");

// Render the top-level React component
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';


// ReactDOM.render(<App />, document.getElementById('react-root'));
ReactDOM.render(
  <Router routes={routes} history={history} />, document.getElementById('react-root')
);