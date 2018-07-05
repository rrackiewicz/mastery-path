import React, { Component } from 'react'

import '../../spacers.css'
import './Pill.css'
// import '../../debug.css'

class Pill extends Component {
  constructor() {
    super()
    this.state = {
    }
  }

  render() {
    return (
        <div className="pill pa-s mt-s mr-s flexH aic jcc">     
          {this.props.icon ? 
            <span>
            {this.props.payload}&nbsp;&nbsp;<span style={{cursor: 'pointer'}} onClick={() => this.props.callback(this.props.index)} className={this.props.icon}></span>
            </span>
          :
            <span>
              {this.props.payload}
            </span>
          }
        </div>
    )
  }
}

export default Pill
