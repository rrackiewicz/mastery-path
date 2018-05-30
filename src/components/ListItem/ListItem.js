import React, { Component } from 'react'

import '../../spacers.css'
import './ListItem.css'
//import './debug.css'

class ListItem extends Component {
  constructor() {
    super()
    this.state = {
    }
  }

  render() {
    return (
      <div onClick={() => this.props.callback(this.props.index)} className="listItem flexH jcfs pa-s">
        {this.props.text}
      </div>
    )
  }
}

export default ListItem
