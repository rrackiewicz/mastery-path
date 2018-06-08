import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from '../Button/Button'
import Dropdown from '../Dropdown/Dropdown'
import axios from 'axios'
import { action_updatePathId } from '../../ducks/reducer'
import { withRouter } from 'react-router'

import '../../spacers.css'
import './Title.css'
//import '../../debug.css'

class Title extends Component {
  constructor() {
    super()
    this.state = {

    }
    this.newPath = this.newPath.bind(this)
    this.filterPaths = this.filterPaths.bind(this)
    this.sortPaths = this.sortPaths.bind(this)
  }

  newPath(val) {
    //val is useless here but I needed to return it to support other button types
    axios.post("/api/paths").then( res => {
      const { pid } = res.data;
      this.props.action_updatePathId(pid)
      this.props.history.push('/auth')
    }).catch( err => {
      alert("Failed to create path")
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
          <h1 className="title">{this.props.title}</h1>
          <p className = "subtitle ml-m">{this.props.subtitle}</p>
          </div>
        <div className="mla">
          {this.props.userContext === 'master' ? 
              <Button 
                payload = "New Path"
                icon = "fas fa-plus"
                callback = {this.newPath}
                bgColor = '#FFD002'
                textColor = '#363636'
              />
            : null
          } 
          <Button 
            payload = "Filters"
            icon = "fas fa-sliders-h"
            //callback = {this.filterPaths}
            bgColor = {this.props.bgColor}
            textColor = '#ffffff'
          />
          <span className="ml-s">
            <Dropdown 
              payload = {['By Oldest', 'By Newest', 'By Popularity', 'Alphabetical']}
              defaultOption = 'By Oldest'
              //callback = {this.sortPaths}
              bgColor = {this.props.bgColor}
              textColor = '#ffffff'
            />
          </span>
        </div>
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

