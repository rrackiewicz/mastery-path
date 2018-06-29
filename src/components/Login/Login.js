import React, { Component } from 'react'
import Logo from '../Logo/Logo'
import Field from '../Field/Field'
import Button from '../Button/Button'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { action_updateUser, action_updateLoggedIn } from '../../ducks/reducer'
import axios from 'axios'

import './Login.css'
import '../../spacers.css'
//import '../../debug.css'

class Login extends Component {
  constructor() {
    super()
    this.state = {
      username : '',
      password: ''
    }

    this.updateUsername = this.updateUsername.bind(this)
    this.updatePassword = this.updatePassword.bind(this)
    this.logInUser = this.logInUser.bind(this)
    this.assignPath = this.assignPath.bind(this)
    this.signUp = this.signUp.bind(this)
  }

  updateUsername(e){
    this.setState({username: e.target.value});
  }

  updatePassword(e){
    this.setState({password: e.target.value})
  }

  logInUser(){
    const user = {username: this.state.username, password: this.state.password}
    axios.post("/api/auth/login", user).then( res => {
      console.log(res.data)
      this.props.action_updateUser(res.data)
      this.props.action_updateLoggedIn(true)       
      //TODO: If isBuilding is true, add user to Master table if they don't already exist, then call assign path. 
      if (this.props.isBuilding) {
        axios.post("/api/master").then( res => {
          console.log("Master added to master table")
          const { mid } = res.data.uid
          this.assignPath(mid);
        }).catch( err => {
          alert("Failed to assign path to user")
        })
        //TODO: 
      } else {
        this.props.history.push("/feed")
      }
      //TODO:

    }).catch( err => {
      alert("Login Failed")
      this.setState({username: ''})
    })
  }

  //TODO:
  assignPath(mid) {
    const pid = this.props.pid
    console.log(`Mid: ${mid}, Pid: ${pid}`)
    this.props.history.push(`/path/${pid}`)
    axios.post(`/api/paths/${pid}/${mid}`).then( res => {
      console.log("Assign path: ", res.data)
    }).catch( err => {
      console.log("Failed to assign path to user")
    })
  }
  //TODO:

  signUp() {
    this.props.history.push(`/signup`)
  }

  render() {
    return (
      <div className="loginContainer flexH aic wrap pl-xl pr-xl" onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>
        <Logo />
        <div className="mr-m ml-l">
          <Field 
            value={this.state.username}
            placeholder = 'Enter username'
            callback = {this.updateUsername}
          />
        </div>
        <div className="mr-s">
          <Field 
            value={this.state.password}
            placeholder = 'Enter password'
            callback = {this.updatePassword}
            isPassword
          />
        </div>
        <div className="">
          <Button 
              payload = 'Log in'
              callback = {this.logInUser}
              bgColor = {this.props.bgColor}
              textColor = '#ffffff'
          />
          <span className="links dottedHorizontalBorder ml-m">
            Forgot Password?
          </span>
        </div>
        {this.props.isSignedUp ? 
          null
          :
          <div className="mla">
            <span className="links dottedHorizontalBorder mr-s">
              Not a Member?
            </span>
            <Button 
              payload = 'Sign Up'
              callback = {this.signUp}
              bgColor = '#FFD002'
              textColor = '#363636'
            />
          </div>
       }
      </div>
    )

  }
}

function mapStateToProps(state) {
  const { bgColor, path, isBuilding, isSignedUp } = state 
  const { pid } = path
  return {
      bgColor,
      pid,
      isBuilding,
      isSignedUp
  }
}

const actions = {
  action_updateUser,
  action_updateLoggedIn
}

export default connect(mapStateToProps, actions)(withRouter(Login))

