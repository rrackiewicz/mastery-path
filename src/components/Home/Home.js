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
      windowHeight: 0,
      boxHeight: 150,
      blurbs: ['...connects experts with learners', '...provides master-currated paths of learning']
    }
    this.handleResize = this.handleResize.bind(this)
  }

  componentDidMount() {
    // window.addEventListener('resize', this.handleResize);
    // this.setState({windowHeight : window.innerHeight})
    // setTimeout(function(){ 
    //   let d = document.querySelector(".animationBox");
    //   d.classList.add("blurb");
    //   d.onCSSAnimationEnd( () => d.classList.remove("blurb"))

    //  }, 10000);
  }

  handleResize(e) {
    this.setState({windowHeight : e.target.innerHeight})
  }

  beginAnimation(){

  }

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
            {this.state.blurbs[0]}
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
