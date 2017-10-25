import React from 'react';
import { Route, IndexRoute } from 'react-router';

/**
 * Import all page components here
 */
import App from './App.jsx';
import Main from './components/ArticlesContainer.jsx';
import Circle from './components/CircleContainer.jsx';
import StayInTheLoop from './components/StayInTheLoopContainer.jsx';
// TODO : delete once we finish the developement
import GoogleAPI from './components/GoogleAPI.jsx';


/**
 * All routes go here.
 * Don't forget to import the components above after adding new route.
 */
export default (
  <Route path="/" component={App}>
    <IndexRoute component={Main} />
    <Route path="/stayintheloop" component={StayInTheLoop} />
    <Route path="/circles" component={Circle} />
    <Route path="/googleapi" component={GoogleAPI} />
  </Route>
);