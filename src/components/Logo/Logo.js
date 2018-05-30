import React, { Component } from 'react'
import { connect } from 'react-redux'
import { action_updateUserContext } from '../../ducks/reducer'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

import logo from '../../logo_white.svg'

import '../../App.css'
import './Logo.css'
import '../../spacers.css'
//import '../../debug.css'

class Logo extends Component {
  constructor() {
    super()
    this.state = {
    }
  }

  render() {
    const logoSize = {
      "maxHeight": "2em"
    }

    return (
      <div className="mr-s">
        {this.props.isLoggedIn ? 
          <Link to="/feed"><img src={logo} style={logoSize} alt=""/></Link>
        :
          <Link to="/"><img src={logo} style={logoSize} alt=""/></Link>
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { isLoggedIn } = state 
  return {
      isLoggedIn
  }
}

export default connect(mapStateToProps)(withRouter(Logo))

