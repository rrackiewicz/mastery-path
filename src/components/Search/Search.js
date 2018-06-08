import React, { Component } from 'react'
import ButtonGroup from '../ButtonGroup/ButtonGroup'
import Logo from '../Logo/Logo'
import SearchField from '../SearchField/SearchField'
import Nav from '../Nav/Nav'
import { connect } from 'react-redux'
import { action_updateUserContext } from '../../ducks/reducer'
import { action_updateLoggedIn } from '../../ducks/reducer'
import { withRouter } from 'react-router'

import './Search.css'
import '../../spacers.css'
//import '../../debug.css'

class Search extends Component {
  constructor() {
    super()
    this.state = {
			isHovered: false,
			isCollapsed: false //haven't done anything with this yet. For toggling magnifying glass.
    }

    this.toggleHover = this.toggleHover.bind(this)
    this.toggleContext = this.toggleContext.bind(this)
  }

  componentDidMount(){
    this.props.action_updateLoggedIn(false)
  }

  toggleHover() {
    this.setState({isHovered : !this.state.isHovered})
  }

  //FIXME: Right now the button toggles no matter which button you press. I would like to make it so if you press and already pressed button, nothing happens. Right now buttonContext does nothing.
  toggleContext(buttonContext) {

    console.log("Pressed on a non-selected link")
    this.props.action_updateUserContext(this.props.userContext === 'apprentice' ? 'master' : 'apprentice')
  }

  render() {

    return (
      <div className="searchContainer flexH aic wrap pl-xl pr-xl" onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>
        <Logo />
        {this.state.isHovered || this.props.isLoggedIn ?
          null
        :
          <div className = "cursor ml-xs">
            |  
          </div>
        }

        {this.state.isHovered || this.props.isLoggedIn ?
          <div className="ml-l">
            <ButtonGroup 
              payload = 'I want to master...'
              callback = {this.toggleContext}
              bgColor = {this.props.bgColor}
              isSelected = {this.props.userContext === 'apprentice' ? true : false}
              textColor = '#ffffff'
              type = 'apprentice'
            /> 
            <ButtonGroup
              payload = 'I am a master of...'
              callback = {this.toggleContext}
              bgColor = {this.props.bgColor}
              isSelected = {this.props.userContext === 'master' ? true : false}
              textColor = '#ffffff'
              type = 'master'
            /> 
          </div>
        : null
        }

        {this.state.isHovered || this.props.isLoggedIn ?
          <div className="ml-s searchField">
            <SearchField />
          </div>
          : null
        }

        {this.props.isLoggedIn ?
          <Nav />
        : null
        }

      </div>
    )

  }
}

function mapStateToProps(state) {
  const { bgColor, userContext, isLoggedIn } = state 
  return {
      bgColor,
      userContext,
      isLoggedIn
  }
}

let actions = {
  action_updateUserContext,
  action_updateLoggedIn
}

export default connect(mapStateToProps, actions)(withRouter(Search))

