import React, { Component } from 'react'
import Search from '../Search/Search'
import { connect } from 'react-redux'
import { rand } from '../../helpers'


import '../../spacers.css'
import './Home.css'
//import '../../debug.css'

class Home extends Component {
  constructor() {
    super()
    // this.state = {
    //   windowHeight: 0,
    //   boxHeight: 150,
    //   blurbs: ['...connects experts with learners', '...provides master-currated paths of learning', '...learning democratized', '...manages your practice on the path to mastery'],
    //   blurbIndex: 0
    // }
    // this.handleResize = this.handleResize.bind(this)
    // this.animationListener = this.animationListener.bind(this)
  }

  // componentDidMount() {
  //   window.addEventListener('resize', this.handleResize)
  //   this.setState({windowHeight : window.innerHeight})
  //   setTimeout(() => { 
  //     let d = document.querySelector(".animationBox")
  //     d.classList.add("blurb")
  //     console.log(d)
  //     d.addEventListener("animationiteration", this.animationListener)
  //    }, 1000)
  // }

  // handleResize(e) {
  //   this.setState({windowHeight : e.target.innerHeight})
  // }

  // animationListener(){
  //   this.setState({blurbIndex: this.state.blurbIndex < this.state.blurbs.length - 1 ? ++this.state.blurbIndex : 0})
  // } 

  render() {

    // const boxCenter = {
    //   height: this.state.boxHeight,
    //   top: this.state.windowHeight / 2 - this.state.boxHeight / 2,
    //   left: '360px',
    //   color: 'white',
    // }

    return (
      <div className="animationWrapper">
        <div className="background flexV jcc" style={{'background' : this.props.bgColor}}>
          <Search/>
        </div>

         {/* <div style={boxCenter} className="animationBox">
            {this.state.blurbs[this.state.blurbIndex]}
         </div> */}
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { bgColor } = state 
  return {
      bgColor
  }
}

export default connect(mapStateToProps)(Home)
