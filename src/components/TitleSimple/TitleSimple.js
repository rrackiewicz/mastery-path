import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Button from '../Button/Button'
import Dropdown from '../Dropdown/Dropdown'
import axios from 'axios'
import { action_updatePathId } from '../../ducks/reducer'
import { withRouter } from 'react-router'

import './TitleSimple.css'
import '../../spacers.css'
//import '../../debug.css'

class Title extends Component {
  constructor() {
    super()
    this.state = {
    }
  }

  render() {
    return (
      <div className= "titleContainer aife flexH wrap ml-xl mr-xl mb-l mt-m pb-xs">
        <div>
          <div className="title">
            <h1>{this.props.title}</h1>
          </div>
          <div className = "subtitle">
            <p className = "ml-m">{this.props.subtitle}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Title

