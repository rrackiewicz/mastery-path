import React, { Component } from 'react'
import Logo from '../Logo/Logo'
import Field from '../Field/Field'
import Button from '../Button/Button'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { action_updateUserUid } from '../../ducks/reducer'
import axios from 'axios'

import './Login.css'
import '../../spacers.css'
//import '../../debug.css'

class Login extends Component {
  constructor() {
    super()
    this.state = {
      email : 'rayrack@gmail.com',
      password: '\u2022\u2022\u2022\u2022\u2022\u2022\u2022'
    }
    this.updateEmail = this.updateEmail.bind(this)
    this.updatePassword = this.updatePassword.bind(this)
    this.loginUser = this.loginUser.bind(this)
    this.assignPath = this.assignPath.bind(this)
  }

  updateEmail(e){
    this.setState({email: e.target.value})
  }

  updatePassword(e){
    this.setState({password: e.target.value});
  }

  loginUser(){
    const user = {email: this.state.email}
    axios.post("/api/auth", user).then( res => {
      const { uid } = res.data;
      this.props.action_updateUserUid(uid)
      this.assignPath();
    }).catch( err => {
      alert("Login Failed")
      this.setState({email: ''})
    })
  }

  assignPath() {
    const pid = this.props.pid
    const uid = this.props.uid
    this.props.history.push(`/path/${pid}`)
    axios.post(`/api/paths/${pid}/${uid}`).then( res => {
      //Nothing is returned
    }).catch( err => {
      alert("Failed to assign path to user")
    })
  }

  render() {
    return (
      <div className="loginContainer flexH aic wrap pl-xl pr-xl" onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>
        <Logo />
        <div className="mr-m ml-l">
          <Field 
            value={this.state.email}
            placeholder = 'Enter email address'
            callback = {this.updateEmail}
          />
        </div>
        <div className="mr-s">
          <Field 
            value={this.state.password}
            placeholder = 'Enter password'
            callback = {this.updatePassword}
          />
        </div>
        <div className="">
          <Button 
              payload = 'Login'
              callback = {this.loginUser}
              bgColor = {this.props.bgColor}
              textColor = '#ffffff'
            />
        </div>
        <div className="mla">
          <span className="notAMember mr-s">
           Not a Member?
          </span>
          <Button 
            payload = 'Sign Up'
            // callback = {this.registerUser}
            bgColor = '#FFD002'
            textColor = '#363636'
          />
        </div>
      </div>
    )

  }
}

function mapStateToProps(state) {
  const { bgColor, user, path } = state 
  const { uid } = user
  const { pid } = path
  return {
      bgColor,
      uid,
      pid
  }
}

const actions = {
  action_updateUserUid
}

export default connect(mapStateToProps, actions)(withRouter(Login))

