import React, { Component } from 'react'
import { connect } from 'react-redux'

import '../../spacers.css'
import './Feed.css'
//import '../../debug.css'

class Feed extends Component {
  constructor() {
    super()
    this.state = {

    }
  } 

  render() {
    return (
      <div>
        Feed Component
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { bgColor } = state 
  return {
      bgColor
  }
}

export default connect(mapStateToProps)(Feed)
