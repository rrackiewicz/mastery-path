import React, { Component } from 'react'
import { connect } from 'react-redux'

import './TextArea.css'
import '../../spacers.css'
//import '../../debug.css'

class TextArea extends Component {
  constructor() {
    super()
    this.state = {
    }
  }

  render() {

    const styleArea = {
      background: this.props.bgColor,
      rows: this.props.rows
    }
    
    return (
        <textarea onChange = {this.props.callback} style = {styleArea} className="textArea pa-s" value={this.props.value} placeholder={this.props.placeholder} rows='4' type="text"/>
    )
  }
}

function mapStateToProps(state) {
  const { bgColor } = state 
  return {
    bgColor
  }
}

export default connect(mapStateToProps)(TextArea)

