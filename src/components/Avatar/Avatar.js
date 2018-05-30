import React, { Component } from 'react'
import { connect } from 'react-redux'

import '../../spacers.css'
import './Avatar.css'
//import './debug.css'

class Avatar extends Component {
  constructor() {
    super()
    this.state = {
    }
  }

  render() {

    const image = {
      backgroundImage: `url(${this.props.img})`
    } 
    
    return (
      <div style={image} className="avatarImage">
      </div>
    )
  }
}
function mapStateToProps(state) {
  const { user } = state
  const { img } = user
  return {
    img
  }
}

let actions = {
}

export default connect(mapStateToProps)(Avatar)
