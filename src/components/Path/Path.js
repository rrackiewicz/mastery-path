import React, { Component } from 'react'
import Header from '../Header/Header'
import TitleSimple from '../TitleSimple/TitleSimple'
import PanelPathDetails from '../PanelPathDetails/PanelPathDetails'
import PanelNodeDetails from '../PanelNodeDetails/PanelNodeDetails'
import PanelPathBuilder from '../PanelPathBuilder/PanelPathBuilder'
import PanelNodeEditor from '../PanelNodeEditor/PanelNodeEditor'
import ButtonGroup from '../ButtonGroup/ButtonGroup'
import SNav from '../SNav/SNav'
import { connect } from 'react-redux'
import { action_updateLoggedIn, action_updatePathContext, action_updateMainWidth } from '../../ducks/reducer'
import { Motion, spring } from 'react-motion'

import './Path.css'
import '../../spacers.css'
//import '../../debug.css'

class Path extends Component {
  constructor() {
    super()
    this.state = {
      temp: '',
      activeLeftPanelPath: 'Details',
      activeMainPanelPath: 'PanelPathBuilder',

      activeLeftPanelNode: 'Details',
      activeMainPanelNode: 'PanelNodeEditor',
      isCollapsed: false,
      //leftMenu should default intelligently
      leftMenu: ['Details', 'Sockets', 'Sharing', 'Oversight'],
    }
    this.handleResize = this.handleResize.bind(this)
    this.updatePanel = this.updatePanel.bind(this)
    this.collapseLeft = this.collapseLeft.bind(this)
    this.toggleContext = this.toggleContext.bind(this)
  }

  handleResize(e) {
    //NOTE: 543 is calculated by taking the margin-left of .main (373px) and adding the margin-right of 80px
    this.props.action_updateMainWidth(e.target.innerWidth - 543)
  }
  
  componentDidMount(){
    //FIXME: Remove this after adding in Auth
    this.props.action_updateLoggedIn(true);

    //Uses this to calculate the width of the main wrapper because I couldn't put a right margin on it (due to there being no wrapper around it and its width being 100%)
    window.addEventListener('resize', this.handleResize);
    this.props.action_updateMainWidth(window.innerWidth - 543);
  }

  //Note sure what happens if this is not removed. Do non-React event listeners persist?
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  updatePanel(panelName) {
    this.props.pathContext === 'path' ? this.setState({activeLeftPanelPath: panelName}) : this.setState({activeLeftPanelNode: panelName})
  }

  collapseLeft() {
    this.setState({isCollapsed : !this.state.isCollapsed})
  }

  renderLeftPanel() {
    if (this.props.pathContext === 'path') {
      switch (this.state.activeLeftPanelPath) {
        case 'Details':
          return (
            <PanelPathDetails
              isCollapsed = {this.state.isCollapsed}
            />
          )
          default:
      }
    } else {
      switch (this.state.activeLeftPanelNode) {
        case 'Details':
          return (
            <PanelNodeDetails
              isCollapsed = {this.state.isCollapsed}
            />
          )
        default:
      }
    }
  }

  renderMainPanel() {
    if (this.props.pathContext === 'path') {
      switch (this.state.activeMainPanelPath) {
        case 'PanelPathBuilder':
        return (
          <PanelPathBuilder
            callback = {this.toggleContext}
          />
        )
        default:
      } 
    } else {
      //console.log(this.props.pathContext)
      switch(this.state.activeMainPanelNode) {
        case 'PanelNodeEditor':
        return (
          <PanelNodeEditor
            // isCollapsed = {this.state.isCollapsed} Think this happens naturally
          />
        )
        default:
      }
    }
  }

  //TODO: Right now, buttonContext is doing nothing. You can pres either button to toggle.

  toggleContext(buttonContext) {
    const { pathContext, userContext } = this.props
    let newContext = pathContext === 'path' ? 'node' : 'path'
    this.props.action_updatePathContext(this.props.pathContext === 'node' ? 'path' : 'node')

    if (userContext === 'master' && newContext === 'path') {
      let leftMenu = [...this.state.leftMenu]
      leftMenu = ['Details', 'Sockets', 'Sharing', 'Oversight']
      this.setState({ leftMenu })
      this.setState({ activeMainPanelPath : 'PanelPathBuilder'})
		} 

		if (userContext === 'master' && newContext === 'node') {
      let leftMenu = [...this.state.leftMenu]
      leftMenu = ['Details', 'Resources', 'Prereqs', 'Domains']
      this.setState({ leftMenu }) 
      this.setState({ activeMainPanelNode: 'PanelNodeEditor'})
		}

		if (userContext === 'apprentice' && newContext === 'path') {
      let leftMenu = [...this.state.leftMenu]
      leftMenu = ['Contract', 'Support', 'Lexicon']
      this.setState({ leftMenu }) 
      // this.setState({ activeMainPanelPath : 'PanelPathOutline'})
		} 

		if (userContext === 'apprentice' && newContext === 'node') {
      let leftMenu = [...this.state.leftMenu]
      leftMenu = ['Details', 'Resources', 'Prereqs', 'Domains']
      this.setState({ leftMenu }) 
      // this.setState({ activeMainPanelNode : 'PanelPathNodeDetails'})
		}
  }

  render() {
    //console.log("In render: ", this.props.pathContext)
    //console.log(this.props.mainWidth)
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
            title = 'Path Builder'
            subtitle = { this.props.path_name }
          />
        </div>

        {/* FIXME: Need to put margin on bottom of button group instead of top of left container to top of scroll bar is at top of left container */}

          <Motion defaultStyle={ this.state.isCollapsed ? { width: 373 } : { width: 0}} style={ this.state.isCollapsed ? { width: spring(0) } : { width: spring(373)}}>
            {(style) => {
              return (
                <div style={{ width: style.width, background: 'blue' }}>
                  <div className="buttonNavWrapper ml-xl">
                    <SNav 
                      payload = {this.state.leftMenu}
                      callback = {this.updatePanel}
                      selected = {this.props.pathContext === 'node' ? this.state.activeLeftPanelNode : this.state.activeLeftPanelPath}
                    />
                  </div>
                  <div className="leftWrapper ml-xl">
                    {this.renderLeftPanel()}
                  </div>
                </div>
              )
            }
            }
          </Motion>

        
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
              bgColor = {this.props.bgColor}
              textColor = '#ffffff'
              isSelected = {this.props.pathContext === 'path' ? true : false}
              type ='path'
            /> 
            <ButtonGroup 
              payload = 'Node'
              callback = {this.toggleContext}
              bgColor = {this.props.bgColor}
              textColor = '#ffffff'
              isSelected = {this.props.pathContext === 'node' ? true : false}
              type ='node'
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
  const { bgColor, path, userContext, pathContext, mainWidth } = state
  const { pid, path_name } = path

  return {
      bgColor,
      pid,
      path,
      userContext,
      pathContext,
      path_name,
      mainWidth
  }
}

let actions = {
  //FIXME: Remove this after adding in Auth
  action_updateLoggedIn,
  action_updatePathContext,
  action_updateMainWidth
}

export default connect(mapStateToProps, actions)(Path)

