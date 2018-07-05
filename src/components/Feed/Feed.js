import React, { Component } from 'react'
import Header from '../Header/Header'
import Title from '../Title/Title'
import { connect } from 'react-redux'
import axios from 'axios'
// import {  } from '../../ducks/reducer'

import '../../spacers.css'
import './Feed.css'
//import '../../debug.css'

class Feed extends Component {
  constructor() {
    super()
    this.state = {
      results: [],
      isLoaded: false,
      newItems: 0
    }
    this.loadFeed = this.loadFeed.bind(this)
  }

  componentDidMount(){
    this.loadFeed()
  }

  loadFeed(){
    
  }

  render() {
    const renderFeed = this.state.results.map((e,i) => {
      return (
        <div></div>
      )
    })

    return (
      <div className="background" style={{'background' : this.props.bgColor}}>
        <div className="headerWrapper">
          <Header />
        </div>
        <div className="titleWrapper">
          <Title 
            title = 'Feed'
            subtitle = {`${this.state.newItems} new items found`}
          />
        </div>
        
        <div className="feedWrapper flexH ml-xl mr-xl aifs wrap">
          {renderFeed}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { bgColor, userContext } = state 
  return {
      bgColor,
      userContext
  }
}

const actions = {

}

export default connect(mapStateToProps)(Feed)

