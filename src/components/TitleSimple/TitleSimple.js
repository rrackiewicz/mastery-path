import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from '../Button/Button'
import axios from 'axios'
import { action_updateIsBuilding } from '../../ducks/reducer'
import { withRouter } from 'react-router'

import '../../spacers.css'
import './TitleSimple.css'
//import '../../debug.css'

//FIXME: This component will need to be conditionally rendered to remove buttons if context = apprentice
class TitleSimple extends Component {
  constructor() {
    super()
    this.state = {
    }
    this.savePath = this.savePath.bind(this)
  }

  	//FIXME: Move this to Paths and disable the save button
	savePath() {
    const path = this.props.path
		axios.put("/api/paths", path).then( res => {
      console.log("Path saved")
      this.props.history.push("/paths")
      this.props.action_updateIsBuilding(false)
    }).catch(err => {
      console.log(err)
      console.log('Problem submitting path.')
    })
	}

  render() {
    return (
      <div className= "titleContainer aife flexH wrap ml-xl mr-xl mb-l mt-m pb-xs">
        <div className="">
          <h1 className="title">{this.props.title}</h1>
          <p className="subtitle ml-m">/&nbsp;{this.props.subtitle}</p>
        </div>
        <div className="mla">
          <Button 
            payload = "Save and Exit"
            callback = {this.savePath}
            bgColor = '#FFD002'
            textColor = '#363636'
          />
          {/* <Button 
            payload = "Reset Path"
            callback = {this.resetPath}
            bgColor = {this.props.bgColor}
            textColor = 'white'
          /> */}
          <Button 
            payload = "Cancel Path"
            //callback = {this.cancelPath}
            bgColor = {this.props.bgColor}
            textColor = 'white'
          />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { bgColor, path } = state
  return {
      bgColor,
      path
  }
}

const actions = {
  action_updateIsBuilding
}

export default connect(mapStateToProps, actions)(withRouter(TitleSimple))

