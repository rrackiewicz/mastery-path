import React, { Component } from 'react'

import '../../spacers.css'
import './Error.css'
// import '../../debug.css'

class Error extends Component {
  constructor() {
    super()
    this.state = {
    }
  }

  render() {

    const message = {
      fontSize: '.75em',
      padding: '3px',
      display: 'inline-block'
    }

    const normal = {
      backgroundColor: 'rgba(255, 255, 255, .6)',
      color: '#363636',
    }

    const warning = {
      background: 'red',
      color: 'white',
    }

    const mergeError = Object.assign({}, message, warning)
    const mergeNormal = Object.assign({}, message, normal)

    return (
        <div style={this.props.warning ? mergeError : mergeNormal} className="error mt-xs ml-s">
          <div>
           <span><span className={this.props.warning ? this.props.iconBad : this.props.iconGood}></span>&nbsp;&nbsp;{this.props.payload}</span>
          </div>
        </div>
    )
  }
}

export default Error
