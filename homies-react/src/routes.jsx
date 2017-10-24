import React from 'react';
import { Route, IndexRoute } from 'react-router';

/**
 * Import all page components here
 */
import App from './App.jsx';
import Main from './components/ArticlesContainer.jsx';
import Circle from './components/CircleContainer.jsx';
import StayInTheLoop from './components/StayInTheLoopContainer.jsx';


/**
 * All routes go here.
 * Don't forget to import the components above after adding new route.
 */
export default (
  <Route path="/" component={App}>
    <IndexRoute component={Main} />
    <Route path="/circles" component={Circle} />
    <Route path="/stayintheloop" component={StayInTheLoop} />
  </Route>
);