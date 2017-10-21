import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './index'
import Loop from './stayInTheLoop'
import circle from './circles'

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/stayInTheLoop' component={Loop}/>
      <Route path='/circles' component={circle}/>
    </Switch>
  </main>
)

export default Main