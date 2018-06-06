import React, { Component } from 'react'
// import ButtonGroup from '../ButtonGroup/ButtonGroup'
import Logo from '../Logo/Logo'
// import SearchField from '../SearchField/SearchField'
// import Nav from '../Nav/Nav'
import { connect } from 'react-redux'
import { action_updateUserContext } from '../../ducks/reducer'
import { withRouter } from 'react-router'

import '../../spacers.css'
import './Header.css'
//import '../../debug.css'

class Header extends Component {
  constructor() {
    super()
    this.state = {
    }

  }

  render() {
    return (
      <div className="headerContainer pl-xl pr-xl">
        <div className="flexH aic wrap">
          <div>
            <Logo />
          </div>
          {/* <div className="ml-l">
            <ButtonGroup 
              payload = 'Apprentice'
              callback = {this.toggleContext}
              context = {this.props.userContext}
              textColor = '#ffffff'
              bgColor = {this.props.bgColor}
              type = 'apprentice'
            /> 
            <ButtonGroup 
              payload = {'\u00a0\u00a0\u00a0Master\u00a0\u00a0\u00a0'}
              callback = {this.toggleContext}
              context = {this.props.userContext}
              textColor = '#ffffff'
              bgcolor = {this.props.bgColor}
              type = 'master'
            /> 
          </div>
          <div className="mla">
            <Nav />
          </div> */}
        </div>        
      </div>
    )

  }
}

function mapStateToProps(state) {
  const { bgColor, userContext} = state 
  return {
      bgColor,
      userContext
  }
}

let actions = {
  action_updateUserContext
}

export default connect(mapStateToProps, actions)(withRouter(Header))

