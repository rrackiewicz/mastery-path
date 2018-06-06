//NOTE: In order for this butotn to be flexible it needs to be composed with different functionalities. For exmaple, when the
//user presses the "+New Path" button, no value needs to be returned, however, when the user presses another type of butotn like
//"Meta Data", value needs to be returned. Sounds like a use for higher order functions.
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
    this.stopPropagation=this.stopPropagation.bind(this)
  }

  stopPropagation(e){
    e.stopPropagation()
    this.props.callback(this.props.payload)
  }

  render() {

    const unSelectedButton = {
      background : this.props.bgColor,
      color : this.props.textColor
    } 

    const selectedButton = {
      background : 'white',
      color : this.props.bgColor
    }
    
    return (
      <button onClick={this.stopPropagation} style={this.props.selected ? selectedButton : unSelectedButton} className="button pa-s ml-s">
      {this.props.icon ? 
        <span>
          {this.props.payload.length > 1 ?
            <span><span className={this.props.icon}></span>&nbsp;&nbsp;{this.props.payload}</span>
          :
          <span className={this.props.icon}></span>
          }
        </span>
        :
        <span>{this.props.payload}</span>
      }
      </button>
    );
  }
}

export default Button;
