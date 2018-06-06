import React, { Component } from 'react'
import Login from '../Login/Login'
import { connect } from 'react-redux'

import '../../spacers.css'
import './Auth.css'
//import '../../debug.css'

class Auth extends Component {
  constructor() {
    super()
    this.state = {
    }
  }

  render() {
    return (
      <div className="background flexV jcc" style={{'background' : this.props.bgColor}}>
        <Login />
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { bgColor} = state 

  return {
      bgColor
  }
}

export default connect(mapStateToProps)(Auth)

