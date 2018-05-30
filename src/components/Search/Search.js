import React, { Component } from 'react'
import ButtonGroup from '../ButtonGroup/ButtonGroup'
import Logo from '../Logo/Logo'
import SearchField from '../SearchField/SearchField'
import Nav from '../Nav/Nav'
import { connect } from 'react-redux'
import { action_updateUserContext } from '../../ducks/reducer'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

import '../../App.css'
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

  toggleHover() {
    this.setState({isHovered : !this.state.isHovered})
  }

  toggleContext() {
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
              payload = {this.props.isLoggedIn ? 'Apprentice' : 'I want to master...'}
              callback = {this.toggleContext}
              bgColor = {this.props.bgColor}
              textColor = '#ffffff'
              type = 'apprentice'
            /> 
            <ButtonGroup 
              payload = {this.props.isLoggedIn ? '\u00a0\u00a0\u00a0Master\u00a0\u00a0\u00a0' : 'I am a master of...'}
              callback = {this.toggleContext}
              bgColor = {this.props.bgColor}
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
  action_updateUserContext
}

export default connect(mapStateToProps, actions)(withRouter(Search))

