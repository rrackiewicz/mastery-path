import React, { Component } from 'react'
import ButtonGroup from '../ButtonGroup/ButtonGroup'
import Logo from '../Logo/Logo'
import SearchField from '../SearchField/SearchField'
import Nav from '../Nav/Nav'
import { connect } from 'react-redux'
import { action_updateUserContext } from '../../ducks/reducer'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

import '../../spacers.css'
//import '../../debug.css'

class Header extends Component {
  constructor() {
    super()
    this.state = {
      isToggled: false,
    }

    this.toggleSearch = this.toggleSearch.bind(this)
    this.toggleContext = this.toggleContext.bind(this)
  }

  toggleSearch() {
    this.setState({isToggled : !this.state.isToggled})
  }

  toggleContext() {
    this.props.action_updateUserContext(this.props.userContext === 'apprentice' ? 'master' : 'apprentice')
  }

  render() {

    // const toggled = {
    //   color: 'white',
    //   fontSize: '1em',
    //   lineHeight: '1em',
    //   width: '24px',
    //   height: '24px',
    //   padding: '6px',
    //   borderStyle: 'solid',
    //   borderWidth: '1px',
    //   borderColor: 'white',
    //   borderRadius: '3px'
    // }

    // const unToggled = {
    //   color: 'white',
    //   fontSize: '1em',
    //   lineHeight: '1em',
    //   width: '24px',
    //   height: '24px',
    //   padding: '6px',
    //   borderStyle: 'solid',
    //   borderWidth: '1px',
    //   borderColor: this.props.bgColor,
    //   borderRadius: '3px'
    // }

    return (
      <div className="headerContainer pl-xl pr-xl">
        <div className="flexH aic wrap">
          <div>
            <Logo />
          </div>
          <div className="ml-l">
            <ButtonGroup 
              payload = 'Apprentice'
              callback = {this.toggleContext}
              textColor = '#ffffff'
              bgColor = {this.props.bgColor}
              type = 'apprentice'
            /> 
            <ButtonGroup 
              payload = {'\u00a0\u00a0\u00a0Master\u00a0\u00a0\u00a0'}
              callback = {this.toggleContext}
              textColor = '#ffffff'
              bgcolor = {this.props.bgColor}
              type = 'master'
            /> 
          </div>
          {/* <div onClick={this.toggleSearch}>
            <span style={this.state.isToggled ? toggled : unToggled} className="fas fa-search"></span>
          </div>
          
          {this.state.isToggled ? 
            <div className="ml-s searchField">
              <SearchField />
            </div>
            :
            null
          } */}
          <div className="mla">
            <Nav />
          </div>
        </div>        
      </div>
    )

  }
}

function mapStateToProps(state) {
  const { bgColor, userContext} = state 
  return {
      bgColor,
      userContext
  }
}

let actions = {
  action_updateUserContext
}

export default connect(mapStateToProps, actions)(withRouter(Header))

