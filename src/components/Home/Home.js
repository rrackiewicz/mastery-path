import React, { Component } from 'react'
import Search from '../Search/Search'
import { connect } from 'react-redux'
import { action_updateBgColor } from '../../ducks/reducer'


import logo from '../../logo_white.svg'

import { randColor } from '../../helpers'

import '../../App.css'
import '../../spacers.css'
//import '../../debug.css'

class Home extends Component {
  constructor() {
    super()
    this.state = {
    }
  }

  componentWillMount() {
    this.props.action_updateBgColor(randColor())
  }

  render() {
    //console.log(this.props.bgColor)
    return (
      <div className="background flexV jcc" style={{'background' : this.props.bgColor}}>
        <Search />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { bgColor } = state 
  return {
      bgColor
  }
}

let actions = {
  action_updateBgColor
}

export default connect(mapStateToProps, actions)(Home)
