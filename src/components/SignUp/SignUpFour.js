import React, { Component } from 'react'
import Logo from '../Logo/Logo'
import Field from '../Field/Field'
import Button from '../Button/Button'
import BoxHeader from '../BoxHeader/BoxHeader'
import Modal from '../Modal/Modal'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { action_updateIsSignedUp } from '../../ducks/reducer'
import axios from 'axios'

import './SignUp.css'
import '../../spacers.css'
//import '../../debug.css'

class SignUpFour extends Component {
  constructor() {
    super()
    this.state = {
      passwordOne: '',
      passwordTwo: '',
      isValid: false,
      doMatch: false,
      score: 0,
      color: 'red',
      modalIsVisible: false
    }
    this.updateUserPassword = this.updateUserPassword.bind(this)
    this.updateMatchPassword = this.updateMatchPassword.bind(this)
    this.formatStrength = this.formatStrength.bind(this)
    this.submitUser = this.submitUser.bind(this)
    this.completeSubmission = this.completeSubmission.bind(this)
  }

  updateUserPassword(e) {
    const password = e.target.value
    const payload = {
      password: e.target.value
    }
    //checks password strength using zxcvb
    axios.post("/api/auth/validatepassword", payload).then( res => {
      this.setState({ score: res.data.score })
      switch(res.data.score) {
        case 0:
          this.setState({isValid: false})
          this.setState({color: '#EC402E'})
          break;
        case 1:
          this.setState({isValid: false})
          this.setState({color: '#F39C12'})
          break;
        case 2:
          this.setState({isValid: false})
          this.setState({color: '#D6D23B'})
          break;
        case 3:
          this.setState({isValid: true})
          this.setState({color: '#8DD63B'})
          break;
        case 4:
          this.setState({isValid: true})
          this.setState({color: '#8DD63B'})
          break;
        default:
        alert("sd")
      }
    })

    this.setState({ passwordOne: password })
  }

  updateMatchPassword(e) {
    const password = e.target.value
    if (this.state.passwordOne === e.target.value) {
      this.setState({doMatch: true})
    } else {
      this.setState({doMatch: false})
    }
    this.setState({ passwordTwo: password })
  }

  formatStrength() {
    switch(this.state.score) {
      case 0:
      return (
        <span className="fas fa-times-circle fa-lg"></span>
      )
      case 1:
      return (
        <span className="fas fa-times-circle fa-lg"></span>
      )
      case 2:
      return (
        <span className="fas fa-times-circle fa-lg"></span>
      )
      case 3:
      return (
        <span className="fas fa-check-circle fa-lg"></span>
      )
      case 4:
      return (
        <span className="fas fa-check-circle fa-lg"></span>
      )
      default:
    }
  }

  checkMatch() {
    if (!this.state.doMatch) {
      return (
        <span>
          <span className="fas fa-times-circle fa-lg"></span><span>&nbsp;&nbsp;Passwords do not match</span>
        </span> 
      )
    } else {
      return (
        <span>
          <span className="fas fa-check-circle fa-lg"></span><span>&nbsp;&nbsp;Passwords match</span>
        </span>
      ) 
    }
  }

  submitUser() {
    //if-statement is only necessary if user has submitted by pressing enter in the confirm password field
    if (this.state.doMatch) {
      let user = {...this.props.user}
      user.password = this.state.passwordOne
      axios.post("/api/auth/signup", user).then( res => {
        this.props.action_updateIsSignedUp(true)
        this.setState({modalIsVisible : true})
      }).catch (err => {

      })
    }
  }

  completeSubmission(){
    this.props.history.push("/auth")
  }

  render() {
    const indicator = {
      color: '#ffffff',
      backgroundColor: this.state.color,
      borderColor: 'white',
      borderStyle: 'solid',
      borderWidth: '1px'
    }
    return (
      <div className="loginContainer flexH aic wrap pl-xl pr-xl" onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>
        <Logo />
        <div className="ml-l mr-s">
        <BoxHeader 
          payload = 'Step 4 of 4'
          isFilled
          width = {100}
          height = {34}
          bgColor = {this.props.bgColor}
          textColor = '#ffffff'
        />
        </div>
        <div className="mr-m mr-s">
          <Field 
            value={this.state.passwordOne}
            placeholder = 'Enter password'
            callback = {this.updateUserPassword}
            isPassword
            autoFocus
          />
        </div>
        <div className="passwordStrength mr-m flexH aic jcc" style={ indicator }>
          {this.formatStrength()}
        </div>
        {this.state.isValid ? 
          <div className="mr-m mr-m">
            <Field 
              value={this.state.passwordTwo}
              placeholder = 'Confirm password'
              callback = {this.updateMatchPassword}
              enterCallback = {this.submitUser}
              isPassword
            />
          </div>
        : null}
        {this.state.passwordTwo.length && this.state.isValid > 0 ?
          <div className="message">
            {this.checkMatch()}
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
          payload = 'Done'
          callback = {this.submitUser}
          bgColor = '#FFD002'
          textColor = '#363636'
          isDisabled = {!this.state.isValid || !this.state.doMatch}
        />
         {this.state.modalIsVisible ?
          <Modal 
            title = "Account Activation Required"
            content = "Before we begin, you will need to activate your account by clicking on the invitation link sent to the email address you signed up with. Easy peasy! Welcome to Mastery Path."
            okText = "Ok"
            okCallback = {this.completeSubmission}
            bgColor = {this.props.bgColor}
            textColor = '#ffffff'
            oneButton
          />
          : null
      }
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { bgColor, user} = state 
  return {
    bgColor,
    user
  }
}

const actions = {
  action_updateIsSignedUp
}

export default connect(mapStateToProps, actions)(withRouter(SignUpFour))

