import React, { Component } from 'react'
import ButtonGroup from '../ButtonGroup/ButtonGroup'
import Logo from '../Logo/Logo'
import SearchField from '../SearchField/SearchField'
import { connect } from 'react-redux'
import { action_updateUserContext } from '../../ducks/reducer'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

import '../../App.css'
import '../../spacers.css'
//import '../../debug.css'

class Search extends Component {
  constructor() {
    super()
    this.state = {
      isHovered: false,
    }

    this.toggleSearch = this.toggleSearch.bind(this)
    this.toggleContext = this.toggleContext.bind(this)
  }

  toggleSearch() {
    this.setState({isHovered : !this.state.isHovered})
  }

  toggleContext() {
    this.props.action_updateUserContext(this.props.userContext === 'apprentice' ? 'master' : 'apprentice')
  }

  render() {

    return (
      <div className="searchContainer flexH aic wrap" onMouseEnter={this.toggleSearch} onMouseLeave={this.toggleSearch}>
        <Logo />
        <div className = "cursor ml-xs">
          |  
        </div>
        {/* Add in top margin with media query */}
        <div className="ml-l">
          <ButtonGroup 
            payload = {this.props.isLoggedIn ? 'Apprentice' : 'I want to master...'}
            callback = {this.toggleContext}
            textColor = '#ffffff'
            type = 'apprentice'
          /> 
          <ButtonGroup 
            payload = {this.props.isLoggedIn ? '  Master ' : 'I am a master of...'}
            callback = {this.toggleContext}
            textColor = '#ffffff'
            type = 'master'
          /> 
        </div>
         {/* Add in top margin with media query */}
        <div className="ml-s searchField mr-l">
          <SearchField />
        </div>
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

