import React, { Component } from 'react'
import Header from '../Header/Header'
import TitleSimple from '../TitleSimple/TitleSimple'
import { connect } from 'react-redux'
import axios from 'axios'
import { action_updateLoggedIn } from '../../ducks/reducer'

import './Path.css'
import '../../spacers.css'
//import '../../debug.css'

class Path extends Component {
  constructor() {
    super()
    this.state = {
      pathName: 'New Path',
      nodes: [],
      mainWidth: 0
    }
    this.handleResize = this.handleResize.bind(this)
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
    window.removeEventListener('resize', this.handleResize);
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
            subtitle = { this.state.pathName }
          />
        </div>

        <div className="leftWrapper ml-xl">
          <div className="buttonNavWrapper">
            Button Nav Goes Here { this.state.isToggled }
          </div>
          <div className="panelWrapper">
            Panel Goes Here
          </div>
        </div>
        
        <div className="mainWrapper">
          <div className="pathNavWrapper">
            Path Navigation goes here
          </div>
          <div style={ mainWidth } className="pathBuilderWrapper">
            Panel Builder Wrapper
          </div>
        </div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  const { bgColor, path } = state
  const { pid } = path

  return {
      bgColor,
      pid,
  }
}

let actions = {
  //FIXME: Remove this after adding in Auth
  action_updateLoggedIn
}

export default connect(mapStateToProps, actions)(Path)

