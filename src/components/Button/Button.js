import React, { Component } from 'react'

import '../../spacers.css'
import './Button.css'
//import './debug.css'

class Button extends Component {
  constructor() {
    super()
    this.state = {
      currentValue: 0,
      options: []
    }
  }

  render() {

    const button = {
      "background" : this.props.bgColor,
      "color" : this.props.textColor
    } 
    
    return (
      <button onClick={() => this.props.callback()} style={button} className="button pa-s ml-s">
      {this.props.icon ? 
        <span><span className={this.props.icon}></span>&nbsp;&nbsp;{this.props.payload}</span>
        :
        <span>{this.props.payload}</span>
      }
      </button>
    );
  }
}

export default Button;
