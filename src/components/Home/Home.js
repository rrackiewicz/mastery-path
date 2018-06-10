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
    this.state = {
      windowHeight: 0,
      boxHeight: 150,
      blurbs: ['...connects experts with learners', '...provides master-currated paths of learning', '...learning democratized', '...manages your practice on the path to mastery']
    }
    // this.handleResize = this.handleResize.bind(this)
    // this.animationListener = this.animationListener.bind(this)
  }

  // componentDidMount() {
  //   window.addEventListener('resize', this.handleResize);
  //   this.setState({windowHeight : window.innerHeight})
  //   setTimeout(function(){ 
  //     let d = document.querySelector(".animationBox");
  //     d.classList.add("blurb");
  //     d.addEventListener("animationend", this.animationListener, false);
  //    }, 1000);
  // }

  // handleResize(e) {
  //   this.setState({windowHeight : e.target.innerHeight})
  // }

  // animationListener(){
  //   this.classList.remove("blurb");
  // } //Also want to disable this animation when search is hovered

  render() {

    // const boxCenter = {
    //   height: this.state.boxHeight,
    //   top: this.state.windowHeight / 2 - this.state.boxHeight / 2,
    //   left: '360px',
    //   width: '700px',
    //   color: 'white',
    // }

    return (
      <div className="animationWrapper">
        <div className="background flexV jcc" style={{'background' : this.props.bgColor}}>
          <Search />
        </div>

         {/* <div style={boxCenter} class="animationBox">
            {this.state.blurbs[rand(0, 5)]}
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
