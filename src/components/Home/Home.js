import React, { Component } from 'react'
import Search from '../Search/Search'
import { connect } from 'react-redux'


import '../../spacers.css'
import './Home.css'
//import '../../debug.css'

class Home extends Component {
  constructor() {
    super()
    this.state = {
    }
  }

  render() {
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

export default connect(mapStateToProps)(Home)
