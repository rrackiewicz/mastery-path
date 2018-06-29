import React, { Component } from 'react'
import Logo from '../Logo/Logo'
import Field from '../Field/Field'
import Button from '../Button/Button'
import { connect } from 'react-redux'
import { action_updateUserFirstName } from '../../ducks/reducer'
import { action_updateUserLastName } from '../../ducks/reducer'

import './SignUp.css'
import '../../spacers.css'
//import '../../debug.css'

class SignUpOne extends Component {
  constructor() {
    super()
    this.state = {
    }
    this.updateFirstName = this.updateFirstName.bind(this)
    this.updateLastName = this.updateLastName.bind(this)
  }

  updateFirstName(e) {
    this.props.action_updateUserFirstName(e.target.value)
  }

  updateLastName(e) {
    this.props.action_updateUserLastName(e.target.value)
  }

  render() {
    return (
      <div className="loginContainer flexH aic wrap pl-xl pr-xl" onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>
        <Logo />
        <div style={{color: this.props.bgColor}} className="stepContainerHeader ml-l mr-s flexH aic jcc ">
          Step 1 of 4
        </div>
        <div className="mr-m mr-s">
          <Field 
            value={this.props.first_name}
            placeholder = 'Enter first name'
            callback = {this.updateFirstName}
          />
        </div>
        <div className="mr-s">
          <Field 
            value={this.props.last_name}
            placeholder = 'Enter last name'
            callback = {this.updateLastName}
          />
        </div>
        <div className="mla">
          <Button 
            payload = 'Next'
            callback = {this.props.callback}
            bgColor = '#FFD002'
            textColor = '#363636'
            isDisabled = {this.props.first_name.length === 0 || this.props.last_name.length === 0}
          />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { bgColor, user} = state 
  const { first_name, last_name } = user
  return {
      bgColor,
      first_name,
      last_name
  }
}

const actions = {
  action_updateUserFirstName,
  action_updateUserLastName
}

export default connect(mapStateToProps, actions)(SignUpOne)

