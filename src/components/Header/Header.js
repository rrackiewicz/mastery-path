import React, { Component } from 'react'
import Logo from '../Logo/Logo'
import ButtonGroup from '../ButtonGroup/ButtonGroup'
import Nav from '../Nav/Nav'
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
    this.toggleContext = this.toggleContext.bind(this)
  }

  toggleContext(){
    
  }

  render() {
    return (
      <div className="headerContainer pl-xl pr-xl">
        {!this.props.isBuilding ? 
        <div className="flexH aic">
          <div>
            <Logo />
          </div>
          <div className="ml-s">
            <ButtonGroup 
              payload = 'Apprentice'
              callback = {this.toggleContext}
              context = {this.props.userContext}
              textColor = '#ffffff'
              bgColor = {this.props.bgColor}
              isSelected = {this.props.userContext === 'apprentice' ? true : false}
              type = 'apprentice'
            /> 
            <ButtonGroup 
              payload = {'\u00a0\u00a0\u00a0Master\u00a0\u00a0\u00a0'}
              callback = {this.toggleContext}
              context = {this.props.userContext}
              textColor = '#ffffff'
              bgcolor = {this.props.bgColor}
              isSelected = {this.props.userContext === 'master' ? true : false}
              type = 'master'
            /> 
          </div>
          <div className="mla">
            <Nav />
          </div>
        </div>  
        : 
        <div>
          <Logo />
        </div>
        }      
      </div>
    )

  }
}

function mapStateToProps(state) {
  const { bgColor, userContext, isBuilding} = state 
  return {
      bgColor,
      userContext,
      isBuilding
  }
}

let actions = {
  action_updateUserContext
}

export default connect(mapStateToProps, actions)(withRouter(Header))

