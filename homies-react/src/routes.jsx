import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App.jsx';
import Main from './components/LoginScreen.jsx';
import Discovery from './components/ArticlesContainer.jsx';
import Circle from './components/CircleContainer.jsx';
import StayInTheLoop from './components/StayInTheLoopContainer.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import LoginScreen from './components/LoginScreen.jsx';
// TODO : delete once we finish the developement
import GoogleAPI from './components/GoogleAPI.jsx';
import NewCircleForm from './components/NewCircleForm.jsx';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Main} />
    <Route path="/discovery" component={Discovery} />
    <Route path="/stayintheloop" component={StayInTheLoop} />
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
    <Route path="/loginscreen" component={LoginScreen} />
    <Route path="/circles" component={Circle} />
    <Route path="/googleapi" component={GoogleAPI} />
    <Route path="/NewCircle" component={NewCircleForm} />
  </Route>
);