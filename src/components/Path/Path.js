import React, { Component } from 'react'
import Header from '../Header/Header'
import TitleSimple from '../TitleSimple/TitleSimple'
import PanelPath from '../PanelPath/PanelPath'
import PanelPathBuilder from '../PanelPathBuilder/PanelPathBuilder'
import ButtonGroup from '../ButtonGroup/ButtonGroup'
import SNav from '../SNav/SNav'
import { connect } from 'react-redux'
import { action_updateLoggedIn } from '../../ducks/reducer'
import { action_updatePathContext } from '../../ducks/reducer'

import './Path.css'
import '../../spacers.css'
//import '../../debug.css'

class Path extends Component {
  constructor() {
    super()
    this.state = {
      // mainWidth: 0, //doubt this is necessary
      activeLeftPanel: 'Details',
      activeMainPanel: 'PathBuilder',
      isCollapsed: false
    }
    this.handleResize = this.handleResize.bind(this)
    this.updatePanel = this.updatePanel.bind(this)
    this.collapseLeft = this.collapseLeft.bind(this)
    this.toggleContext = this.toggleContext.bind(this)
  }

  handleResize(e) {
    //NOTE: 543 is calculated by taking the margin-left of .main (373px) and adding the margin-right of 80px
    this.setState({ windowWidth: e.target.innerWidth - 543});
  }

  
  componentDidMount(){
    //FIXME: Remove this after adding in Auth
    this.props.action_updateLoggedIn(true);

    //Uses this to calculate the width of the main wrapper because I couldn't put a right margin on it (due to there being no wrapper around it and its width being 100%)
    window.addEventListener('resize', this.handleResize);
    this.setState({ windowWidth: window.innerWidth - 543});

  }

  //Note sure what happens if this is not removed. Do non-React event listeners persist?
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  updatePanel(val) {
    this.setState({activeLeftPanel : val})
  }

  collapseLeft() {
    this.setState({isCollapsed : !this.state.isCollapsed})
  }

  renderLeftPanel() {
    switch (this.state.activeLeftPanel) {
      case 'Details':
      return (
        <PanelPath
          callback = {this.updatePathName}
          isCollapsed = {this.state.isCollapsed}
        />
      )

      // case 'Details' && this.props.pathContext === 'node':
      // return (
      //   <PanelPath
      //     callback = {this.updatePathName}
      //     isCollapsed = {this.state.isCollapsed}
      //   />
      // )
      default:
      //FIXME: Add other cases when they come online
    }
  }

  renderMainPanel() {
    switch (this.state.activeMainPanel) {
      case 'PathBuilder':
      return (
        <PanelPathBuilder
          // isCollapsed = {this.state.isCollapsed} Think this happens naturally
          windowWidth = {this.state.windowWidth}
        />
      )

      case 'DetailsBuilder':
      return (
        <PanelPathBuilder
          // isCollapsed = {this.state.isCollapsed} Think this happens naturally
          windowWidth = {this.state.windowWidth}
        />
      )

      
      default:
      //FIXME: Add other cases when they come online
    }
  }

  //TODO: Right now, buttonContext is doing nothing. You can pres either button to toggle.
  toggleContext(buttonContext) {
    this.props.action_updatePathContext(this.props.pathContext === 'path' ? 'node' : 'path')
  }


  render() {

    const mainWidth = {
      width: this.state.windowWidth
    }

    return (
      <div className="background" style={{'background' : this.props.bgColor}}>
        
        <div className="headerWrapper">
          <Header />
        </div>
  
        <div className="titleWrapper">
          <TitleSimple 
            title = 'Paths'
            subtitle = { this.props.path_name }
          />
        </div>

        {/* FIXME: Need to put margin on bottom of button group instead of top of left container to top of scroll bar is at top of left container */}
        {this.state.isCollapsed ?
          null
          :
          <div>
            <div className="buttonNavWrapper ml-xl">
              <SNav 
                updatePanel = {this.updatePanel}
                pid = {this.props.pid}
              />
            </div>
            <div className="leftWrapper ml-xl">
              {this.renderLeftPanel()}
            </div>
          </div>
        }
        
        {/* Don't like hard-coding 64px in here. */}
        <div style={this.state.isCollapsed ? {marginLeft: '64px'} : {}} className="pathNavigatorWrapper flexH aic">
          {/* Eventually will have 3 parts in here. Collapse Button, SVG Context Bar, and Path View button group */}
          <div onClick={this.collapseLeft}>
            <span className={this.state.isCollapsed ? "fas fa-chevron-circle-right" : "fas fa-chevron-circle-left"}></span>
          </div>
          <div className="ml-m">
            <ButtonGroup 
              payload = 'Path'
              callback = {this.toggleContext}
              context = {this.props.pathContext}
              bgColor = {this.props.bgColor}
              textColor = '#ffffff'
              type = 'path'
            /> 
            <ButtonGroup 
              payload = 'Node'
              callback = {this.toggleContext}
              context = {this.props.pathContext}
              bgColor = {this.props.bgColor}
              textColor = '#ffffff'
              type = 'node'
            /> 
          </div>
        </div>

        <div style={this.state.isCollapsed ? {marginLeft: '64px'} : {}} className="mainWrapper mr-xl">
          <div style={ mainWidth } className="">
            {this.renderMainPanel()}
          </div>
        </div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  const { bgColor, path, pathContext } = state
  const { pid, path_name } = path

  return {
      bgColor,
      pid,
      path,
      pathContext,
      path_name,
  }
}

let actions = {
  //FIXME: Remove this after adding in Auth
  action_updateLoggedIn,
  action_updatePathContext
}

export default connect(mapStateToProps, actions)(Path)

