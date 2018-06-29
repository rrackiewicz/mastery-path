import React, { Component } from 'react'
import Logo from '../Logo/Logo'
import Field from '../Field/Field'
import Button from '../Button/Button'
import { connect } from 'react-redux'
import { action_updateUsername, action_updateUsernameIsAvailable } from '../../ducks/reducer'
import axios from 'axios'

import './SignUp.css'
import '../../spacers.css'
//import '../../debug.css'

class SignUpTwo extends Component {
  constructor() {
    super()
    this.state = {
    }
    this.updateUsername = this.updateUsername.bind(this)
    this.checkAvailability = this.checkAvailability.bind(this)
    this.nextPage = this.nextPage.bind(this)
  }

  updateUsername(e) {
    if (e.target.value.length > 0) {
      axios.post(`/api/auth/verifyuser/${e.target.value}`).then( res => {
        if (res.data.length === 0) {
          this.props.action_updateUsernameIsAvailable(true)
        } else {
          this.props.action_updateUsernameIsAvailable(false)
        }
      }).catch( err => {
  
      })
    }
    this.props.action_updateUsername(e.target.value)
  }

  checkAvailability() {
    return this.props.usernameIsAvailable ? 
    <span>
      <span className="fas fa-check-circle fa-lg"></span><span>&nbsp;&nbsp;Available</span>
    </span>
    :
    <span>
      <span className="fas fa-times-circle fa-lg"></span><span>&nbsp;&nbsp;Not Available</span>
    </span> 
  }

  //This functionality allows the user to press enter to advance to the next step
  nextPage(e) {
    if (e.key === 'Enter' && this.props.usernameIsAvailable && this.props.username.length > 0) {
      this.props.enterCallback()
    }
  }

  render() {
    return (
      <div className="loginContainer flexH aic wrap pl-xl pr-xl" onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>
        <Logo />
        <div style={{color: this.props.bgColor}} className="stepContainerHeader ml-l mr-s flexH aic jcc">
        Step 2 of 4
        </div>
        <div className="mr-m mr-m">
          <Field 
            value={this.props.username}
            placeholder = 'Enter username'
            callback = {this.updateUsername}
            enterCallback = {this.nextPage}
          />
        </div>
        {this.props.username.length > 0 ?
          <div className="message">
            {this.checkAvailability()}
          </div>
          : null
        }
        <div className="mla mr-s">
          <Button 
            payload = 'Previous'
            callback = {this.props.callback}
            bgColor = {this.props.bgColor}
            textColor = '#FFFFFF'
          />
        </div>
        <Button 
          payload = 'Next'
          callback = {this.props.callback}
          bgColor = '#FFD002'
          textColor = '#363636'
          isDisabled = {!this.props.usernameIsAvailable}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { bgColor, user, usernameIsAvailable } = state 
  const { username } = user
  return {
      bgColor,
      usernameIsAvailable,
      username
  }
}

const actions = {
  action_updateUsername,
  action_updateUsernameIsAvailable
}

export default connect(mapStateToProps, actions)(SignUpTwo)

