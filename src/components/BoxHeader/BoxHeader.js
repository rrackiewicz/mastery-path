import React, { Component } from 'react'

import '../../spacers.css'
import './BoxHeader.css'
//import './debug.css'

class BoxHeader extends Component {
  constructor() {
    super()
    this.state = {
    }
  }

  render() {
    const isUnfilled = {
      background : this.props.bgColor,
      border: '1px solid white',
      color : this.props.textColor,
      width: this.props.width,
      height: this.props.height,
      cursor: this.props.callback ? 'pointer' : null
    } 

    const isFilled = {
      background : 'white',
      color : this.props.bgColor,
      width: this.props.width,
      height: this.props.height,
      cursor: this.props.callback ? 'pointer' : null
    }
    
    return (
      <div onClick={this.props.callback} style={this.props.isFilled ? isFilled : isUnfilled} className="flexH aic jcc">
         <div>
          {this.props.payload}
         </div>
      </div>
    )
  }
}

export default BoxHeader;
