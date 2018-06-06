import React, { Component } from 'react'

import '../../spacers.css'
import './Badge.css'
// import '../../debug.css'

class Badge extends Component {
  constructor() {
    super()
    this.state = {
    }
  }

  render() {
    return (
        <div className="badge pa-xs mt-s mb-s flexH aic jcfs">
          <div>
            {this.props.payload}
          </div>
        </div>
    )
  }
}

export default Badge
