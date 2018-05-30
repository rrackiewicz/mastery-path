import React, { Component } from 'react'

//import './debug.css'

class TeleType extends Component {
  constructor() {
    super()
    this.state = {
      direction: 'forward',
      delay: '5s',
      delayIncrement: '3.5',
      previousText: '',
      character: '',
      index: 0
    }

    this.advanceString = this.advanceString.bind(this)
  }

  componentWillMount() {
    this.setState({
      previousText : this.props.message[0],
      character: this.props.message[1]
    })

    // How can I run this asynchronously? Web workers? CSS Animation? React-Motion?

  }

  advanceString() {
    this.setState({
      previousText : this.props.message.slice(0,this.state.index),
      nextText: this.props.message.slice(this.state.index+1, this.state.index+3),
      index: this.state.index <= this.props.message.length ? this.state.index + 1 : 0
    })

  }

  render() {

  // const letter = {
  //   'animation' : `pulse ${this.state.delayIncrement} linear ${this.state.delay} infinite`,
  //   'fontSize' : '1em',
  //   'marginLeft' : '15px',
  //   'color' : 'white'
  // }

    return (
      <span className="tagline">
        <span className="prefix">{this.state.previousText}</span>
        <span>{this.state.character}</span> 
      </span>
    )
  }
}

export default TeleType;
