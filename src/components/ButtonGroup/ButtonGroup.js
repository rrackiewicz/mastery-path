import React, { Component } from 'react'
import { connect } from 'react-redux'

import '../../spacers.css'
import './ButtonGroup.css'
//import './debug.css'

class ButtonGroup extends Component {
  constructor() {
    super()
    this.state = {
    }
  }

  render() {

    const button = {
      "background" : this.props.bgColor,
      "color" : this.props.textColor,
      "outline" : "none"
    } 
    
    const buttonPressed = {
      "background" : 'rgba(255, 255, 255, 1)',
      "color" : this.props.bgColor,
      "outline" : "none"
    }
    
    return (
      <button onClick={() => this.props.callback()} style={ this.props.userContext === this.props.type ? buttonPressed : button } className="buttong pa-s" >{this.props.payload}</button>
    );
  }
}

function mapStateToProps(state) {
  const { bgColor, userContext } = state 
  return {
      bgColor,
      userContext,
  }
}

export default connect(mapStateToProps)(ButtonGroup)
