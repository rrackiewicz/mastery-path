import React from 'react';
import {Switch, Route} from 'react-router-dom'

//Components
import Home from './components/Home/Home'
import Results from './components/Results/Results'
import Path from './components/Path/Path'
import Paths from './components/Paths/Paths'
// import Node from './components/Node/Node'
import Auth from './components/Auth/Auth'
// import Feed from './components/Feed/Feed'



export default (
  <Switch>
    <Route component={Home} exact path ="/" />
    <Route component={Results} path ="/results/:searchid" />
    <Route component={Path} path ="/path/:pathid" />
    {/* <Route component={Node} path ="/path/:pathid/:nodeid" /> */}
    <Route component={Paths} path ="/paths" />
    <Route component={Auth} path ="/auth" />
    {/* <Route component={Feed} path ="/feed" /> */}
 </Switch>
)
