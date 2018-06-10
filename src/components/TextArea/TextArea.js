import React, { Component } from 'react'
import { connect } from 'react-redux'

import './TextArea.css'
import '../../spacers.css'
//import '../../debug.css'

class TextArea extends Component {
  constructor() {
    super()
    this.state = {
    }
    this.autoResize = this.autoResize.bind(this)
  }

  componentDidMount(){
    let ta = document.querySelector(".textArea")
    ta.addEventListener('input', this.autoResize, false);
  }

  autoResize(ta){
    console.log('Resizing: ', ta)
    // this.style.height = 'auto';
    // this.style.height = this.scrollHeight+'px';
    // this.scrollTop = this.scrollHeight;
    // window.scrollTo(window.scrollLeft,(this.scrollTop + this.scrollHeight));
  }

  render() {

    const styleArea = {
      background: this.props.bgColor,
      height: this.props.rows + 'em'
    }
    
    return (
        <textarea onChange = {this.props.callback} style = {styleArea} className="textArea pa-s" value={this.props.value} placeholder={this.props.placeholder} type="text"/>
    )
  }
}

function mapStateToProps(state) {
  const { bgColor } = state 
  return {
    bgColor
  }
}

export default connect(mapStateToProps)(TextArea)

