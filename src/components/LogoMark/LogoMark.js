import React, { Component } from 'react'

import logo from '../../mark_white.svg'

import './LogoMark.css'
import '../../spacers.css'
//import '../../debug.css'

class LogoMark extends Component {
  constructor() {
    super()
    this.state = {
    }
  }

  render() {
    const logoSize = {
      "maxHeight": "2rem"
    }

    return (
      <span className="mr-m">
        <img src={logo} style={logoSize} alt=""/>
      </span>
    )
  }
}

export default LogoMark

