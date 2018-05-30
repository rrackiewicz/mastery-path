import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Button from '../Button/Button'
import Dropdown from '../Dropdown/Dropdown'
import axios from 'axios'
import { action_updatePathId } from '../../ducks/reducer'
import { withRouter } from 'react-router'

import './Title.css'
import '../../spacers.css'
//import '../../debug.css'

class Title extends Component {
  constructor() {
    super()
    this.state = {
      resultCount: 0,
    }
    this.newPath = this.newPath.bind(this)
    this.assignPath = this.assignPath.bind(this)
    this.filterPaths = this.filterPaths.bind(this)
    this.sortPaths = this.sortPaths.bind(this)

  }

  newPath() {
    axios.post("/api/paths").then( res => {
      const pid = res.data;
      this.props.action_updatePathId({ pid })
      this.assignPath(pid)
    }).catch( err => {
      alert("Failed to create path")
    })
  }

  assignPath({ pid }) {
    this.props.history.push(`/path/${pid}`)
    axios.post(`/api/paths/${pid}/${this.props.uid}`).then( res => {
    }).catch( err => {
      alert("Failed to assign path to user")
    })
  }

  filterPaths() {

  }

  sortPaths() {

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
        {this.props.userContext === 'master' && !this.props.isBuilding ? 
          <div className="mla">
            <Button 
              payload = "New Path"
              icon = "fas fa-plus"
              callback = {this.newPath}
              bgColor = {this.props.bgColor}
              textColor = '#ffffff'
            />
          </div>
          : null
        }
        {this.props.isBuilding ?
          null
        :
          <span>
            <Button 
              payload = "Filters"
              icon = "fas fa-sliders-h"
              callback = {this.filterPaths}
              bgColor = {this.props.bgColor}
              textColor = '#ffffff'
            />
            <Dropdown 
              payload = {['By Oldest', 'By Newest', 'By Popularity', 'Alphabetical']}
              defaultOption = 'By Oldest'
              callback = {this.sortPaths}
              bgColor = {this.props.bgColor}
              textColor = '#ffffff'
            />
          </span>
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { bgColor, userContext, pathContext, path, user } = state 
  const { pid } = path
  const { uid } = user
  return {
      bgColor,
      userContext,
      pathContext,
      pid,
      uid
  }
}

let actions = {
  action_updatePathId
}

export default connect(mapStateToProps, actions)(withRouter(Title))

