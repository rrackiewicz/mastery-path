import React, { Component } from 'react'
import SignUpOne from './SignUpOne'
import SignUpTwo from './SignUpTwo'
import SignUpThree from './SignUpThree'
import SignUpFour from './SignUpFour'
import { connect } from 'react-redux'

import '../../spacers.css'
import './SignUp.css'
//import '../../debug.css'

class SignUp extends Component {
  constructor() {
    super()
    this.state = {
      step: 1
    }
    this.renderStep = this.renderStep.bind(this)
    this.changeStep = this.changeStep.bind(this)
    this.advanceStep = this.advanceStep.bind(this)
  }

  renderStep() {
    switch(this.state.step) {
      case 1: 
        return (
          <SignUpOne
            callback = {this.changeStep}
            enterCallback = {this.advanceStep}
          />
        )
      case 2: 
        return (
          <SignUpTwo
            callback = {this.changeStep}
            enterCallback = {this.advanceStep}
          />
        )
      case 3: 
        return (
          <SignUpThree
            callback = {this.changeStep}
            enterCallback = {this.advanceStep}
          />
        )
      case 4: 
        return (
          <SignUpFour
            callback = {this.changeStep}
          />
        )
      default: 
    }
  }

  changeStep(payload) {
    if (payload === 'Next' && this.state.step < 4) {
      this.setState({step: this.state.step + 1})
    } else if (payload === 'Previous' && this.state.step > 1) {
      this.setState({step: this.state.step - 1})
    }
  }

  //This is for Sign Up components that allow the user to press enter to move to the next step.
  //This is triggered by an enterCallback attacked to the username and email fields in steps 2 and 3
  advanceStep() {
    this.setState({step: this.state.step + 1})
  }

  render() {
    return (
      <div className="background flexV jcc" style={{'background' : this.props.bgColor}}>
        {this.renderStep()}
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

export default connect(mapStateToProps)(SignUp)

