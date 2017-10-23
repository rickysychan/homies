import React from 'react'
import { Switch, Route } from 'react-router-dom'
import ArticlesContainer from './components/ArticlesContainer'
import inTheLoopContainer from './components/InTheLoopContainer'
import circle from './components/CircleContainer'
// import './styles/main.css';
import login from './components/Login'
import register from './components/Register'

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={ArticlesContainer}/>
      <Route path='/stayInTheLoop' component={inTheLoopContainer}/>
      <Route path='/circles' component={circle}/>
      <Route path='/login' component={login}/>
      <Route path='/Register' component={register}/>
    </Switch>
  </main>
)

export default Main