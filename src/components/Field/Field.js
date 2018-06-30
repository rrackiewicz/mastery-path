import React, { Component } from 'react'
import { connect } from 'react-redux'

import './Field.css'
import '../../spacers.css'
//import '../../debug.css'

class Field extends Component {
  constructor() {
    super()
    this.state = {
    }
  }

  render() {
    return (
        <input onKeyDown={this.props.enterCallback ? this.props.enterCallback : null} onChange={this.props.callback} className="field" value={this.props.value} style={this.props.noBorder ? {background: this.props.bgColor, borderStyle: 'none'} : {background: this.props.bgColor}} placeholder={this.props.placeholder} disabled = {this.props.isDisabled} type={this.props.isPassword ? "password" : "text"} autoFocus={this.props.autoFocus ? true : false}/>
    )
  }
}

function mapStateToProps(state) {
  const { bgColor } = state 
  return {
    bgColor
  }
}

export default connect(mapStateToProps)(Field)

