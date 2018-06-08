// Find a way to close list if someone clicks outside of it
// Changes open direction based on page position or some flag, e.g. openUp
// Child container cannot exceed size of parent causing listItems to wrap
// Scrolling for long lists
// Payload is an array of objects with a discretionary icon

import React, { Component } from 'react'
import ListItem from '../ListItem/ListItem'
import { connect } from 'react-redux'
import onClickOutside from "react-onclickoutside";

import '../../spacers.css'
import './Dropdown.css'
//import './debug.css'

class Dropdown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentOption: '',
      isOpen: false
    }
    this.updateList = this.updateList.bind(this)
    this.toggleList = this.toggleList.bind(this)
  }

  handleClickOutside = evt => {
    //practicing using && as if statement surrogate
    this.state.isOpen && this.setState({isOpen : false})
  };

  componentDidMount(){
    const { defaultOption } = this.props
    this.setState({ currentOption : defaultOption })
  }

  updateList(value){
    this.setState({currentOption: this.props.payload[value]})
    this.setState({isOpen : false})
    this.props.callback(this.props.payload[value]);
  }

  toggleList(){
    this.setState({isOpen : !this.state.isOpen})
  }

  render() {
    const button = {
      background : this.props.bgColor,
      color : this.props.textColor
    }
    
    const shadow = {
      boxShadow: "6px 6px rgba(0, 0, 0, 0.1)",
      borderStyle: "solid",
      borderColor: "white",
      borderWidth: "1px"
    }

    const dropDown = Object.assign({}, button, shadow)

    const generateList = this.props.payload.map((e,i) => {
      return (
        <ListItem
          key = {e}
          index = {i}
          text = {e}
          callback = {this.updateList}
        />
      )
    })

    return (
      <div className="dropdown">
        <button onClick={this.toggleList} style={button} className="button pa-s">{this.state.currentOption}&nbsp;&nbsp;<span className="fas fa-caret-down"></span></button>
        {this.state.isOpen ?
          <div className="optionWrapper" style={dropDown}>
            {generateList}
          </div>
        :
          null
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { bgColor} = state 
  return {
      bgColor,
  }
}

let actions = {
}

export default connect(mapStateToProps, actions)(onClickOutside(Dropdown))
