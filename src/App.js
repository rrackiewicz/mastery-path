import React, { Component } from 'react'
import { HashRouter } from 'react-router-dom'
import routes from './routes'

import './App.css'
//import './debug.css'

class App extends Component {
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

export default App;