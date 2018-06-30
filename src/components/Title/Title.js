import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from '../Button/Button'
import Dropdown from '../Dropdown/Dropdown'
import axios from 'axios'
import { action_updatePathId, action_updateIsBuilding } from '../../ducks/reducer'
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
    this.assignPath = this.assignPath.bind(this)
  }

  newPath(val) {
    //val is useless here but I needed to return it to support other button types
    axios.post("/api/paths").then( res => {
      const { pid } = res.data;
      this.props.action_updatePathId(pid)
      //route depends on whether user is logged in or not
      //NOTE: This code is duplicated in Login.js. Always check for updates until this is modularized.
      if (this.props.isLoggedIn) {
        axios.post("/api/master").then( res => {
          console.log("Master added to master table")
          const { mid } = res.data.uid
          this.assignPath(mid);
        }).catch( err => {
          alert("Failed to assign master to master table")
        }) 
      } 
      else {
        //TODO: Defer adding user to Master table until after they are signed in.
        this.props.history.push('/auth')
      }
      this.props.action_updateIsBuilding(true)
    }).catch( err => {
      alert("Failed to create path")
    })
  }

  //NOTE: This code is duplicated in Login.js. Always check for updates until this is modularized.
  assignPath(mid) {
    const pid = this.props.pid
    console.log(`Mid: ${mid}, Pid: ${pid}`)
    this.props.history.push(`/path/${pid}`)
    axios.post(`/api/paths/${pid}/${mid}`).then( res => {
      console.log("Assign path: ", res.data)
    }).catch( err => {
      console.log("Failed to assign path to user")
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
  const { bgColor, userContext, pathContext, path, isLoggedIn, isBuilding } = state 
  const { pid } = path
  return {
      bgColor,
      userContext,
      pathContext,
      pid,
      isLoggedIn,
      isBuilding
  }
}

let actions = {
  action_updatePathId,
  action_updateIsBuilding
}

export default connect(mapStateToProps, actions)(withRouter(Title))

