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
          <div>
            {this.props.payload}
          </div>
        </div>
    )
  }
}

export default Pill
