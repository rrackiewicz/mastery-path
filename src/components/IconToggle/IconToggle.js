import React, { Component } from 'react'

import '../../spacers.css'
import './IconToggle.css'
//import './debug.css'

class IconToggle extends Component {
  constructor() {
    super()
    this.state = {
      
    }
    this.stopPropagation=this.stopPropagation.bind(this)
  }

  stopPropagation(e){
    e.stopPropagation()
    this.props.callback(this.props.context)
  }

  render() {

    const unToggledButton = {
      color : 'white'
    } 

    const toggledButton = {
      background : 'white',
      color : this.props.bgColor,
      borderRadius: '3px',
      boxShadow: 'inset -1px -1px 3px 0px #999999',
    }
    
    return (
      <div onClick={this.stopPropagation} style={this.props.isToggled ? toggledButton : unToggledButton} className="icon pa-s ml-s flexH aic jcc">
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
      </div>
    )
  }
}

export default IconToggle;
