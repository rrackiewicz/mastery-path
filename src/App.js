import React, { Component } from 'react'
import { HashRouter } from 'react-router-dom'
import routes from './routes'
import { connect } from 'react-redux'
import { action_updateBgColor } from './ducks/reducer'

import { randColor } from './helpers'

import './App.css'
//import './debug.css'

class App extends Component {

  componentWillMount() {
    this.props.action_updateBgColor(randColor())
  }

  render() {
    return (
      <span>
        {/* Hash Router can only have 1 child */}
        <HashRouter>
          {routes}
        </HashRouter>
      </span>
    );
  }
}

let actions = {
  action_updateBgColor
}

export default connect(null, actions)(App)