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

    console.log(this.props)
    
    return (

      <button onClick={() => this.props.callback(this.props.type)} style={ this.props.isSelected ? buttonPressed : button } className="buttong pt-s pb-s pr-m pl-m" >{this.props.payload}</button>
    )
  }
}

// NOTE: We do not use userContext because buttonG receives different types of contexts
function mapStateToProps(state) {
  const { bgColor} = state 
  return {
      bgColor
  }
}

export default connect(mapStateToProps)(ButtonGroup)
