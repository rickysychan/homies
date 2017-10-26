import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App.jsx';
import Main from './components/ArticlesContainer.jsx';
import Circle from './components/CircleContainer.jsx';
import StayInTheLoop from './components/StayInTheLoopContainer.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Main} />
    <Route path="/circles" component={Circle} />
    <Route path="/stayintheloop" component={StayInTheLoop} />
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
  </Route>
);