import React, { Component } from 'react'
import Logo from '../Logo/Logo'
import Field from '../Field/Field'
import Button from '../Button/Button'
import { connect } from 'react-redux'
import { validateEmail } from '../../helpers'
import { action_updateUserEmail, action_updateEmailIsAvailable, action_updateEmailIsValid } from '../../ducks/reducer'
import axios from 'axios'

import './SignUp.css'
import '../../spacers.css'
//import '../../debug.css'

class SignUpThree extends Component {
  constructor() {
    super()
    this.state = {
    }
    this.updateUserEmail = this.updateUserEmail.bind(this)
    this.checkAvailability = this.checkAvailability.bind(this)
    this.nextPage = this.nextPage.bind(this)
  }

  updateUserEmail(e) {
    const email = e.target.value
    this.props.action_updateEmailIsValid(validateEmail(email))
    
    if (this.props.emailIsValid && this.props.email.length > 0) {
      axios.post(`/api/auth/verifyemail/${email}`).then( res => {
        if (res.data.length === 0) {
          this.props.action_updateEmailIsAvailable(true)
        } else {
          this.props.action_updateEmailIsAvailable(false)
        }
      }).catch( err => {

      })
    }
    this.props.action_updateUserEmail(email)
  }

  checkAvailability() {
    if (!this.props.emailIsValid) {
      return (
        <span>
          <span className="fas fa-times-circle fa-lg"></span><span>&nbsp;&nbsp;Invalid email adddress</span>
        </span> 
      )
    } else if (!this.props.emailIsAvailable) {
      return (
        <span>
          <span className="fas fa-times-circle fa-lg"></span><span>&nbsp;&nbsp;Account with this email already exists</span>
        </span>
      ) 
    } else {
      return (
        <span>
          <span className="fas fa-check-circle fa-lg"></span><span>&nbsp;&nbsp;Well-formatted email address</span>
        </span>
      ) 
    }
  }

  //This functionality allows the user to press enter to advance to the next step
  nextPage(e) {
    if (e.key === 'Enter' && this.props.emailIsValid && this.props.email.length > 0) {
      this.props.enterCallback()
    }
  }

  render() {
    return (
      <div className="loginContainer flexH aic wrap pl-xl pr-xl" onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>
        <Logo />
        <div style={{color: this.props.bgColor}} className="stepContainerHeader ml-l mr-s flexH aic jcc">
        Step 3 of 4
        </div>
        <div className="mr-m mr-m">
          <Field 
            value={this.props.email}
            placeholder = 'Enter email address'
            callback = {this.updateUserEmail}
            enterCallback = {this.nextPage}
            autoFocus
          />
        </div>
        {this.props.email.length > 0 ?
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
          isDisabled = {!this.props.emailIsAvailable || !this.props.emailIsValid}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { bgColor, user, emailIsAvailable, emailIsValid} = state 
  const { email } = user
  return {
      bgColor,
      emailIsAvailable,
      emailIsValid,
      email
  }
}

const actions = {
  action_updateUserEmail, action_updateEmailIsAvailable, action_updateEmailIsValid
}

export default connect(mapStateToProps, actions)(SignUpThree)

