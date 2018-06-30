import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FadeLoader } from 'react-spinners'

import '../../spacers.css'
import './CardBlank.css'
//import '../../debug.css'

class CardBlank extends Component {
  constructor() {
    super()
    this.state = {
    }
  }

  render() {
    return (
      <div className="cardEmpty flexV aic jcc" style={{'background' : this.props.bgColor}}>
        <FadeLoader
          color={'#ffffff'} 
          loading
        />
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

export default connect(mapStateToProps)(CardBlank)
