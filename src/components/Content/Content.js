import React, {Component} from 'react'
import { connect } from 'react-redux'
import Field from '../Field/Field'
import Button from '../Button/Button'
import { action_updateSelectedContent } from '../../ducks/reducer'

import '../../spacers.css'
import './Content.css'
//import '../../debug.css'

class Content extends Component {
  constructor(){
    super()
    this.state = {

    }
    this.deleteContent = this.deleteContent.bind(this)
    this.updateContent = this.updateContent.bind(this)
    this.renderIcon = this.renderIcon.bind(this)
  }

  deleteContent(){

  }

  updateContent() {

  }

  renderIcon(){
    switch(this.props.context) {
      case 'h1':
        return (
          <span className="fas fa-h1"></span>
        )
      case 'h3':
        return (
          <span className="fas fa-h3"></span>
        )
      case 'p':
        return (
          <span className="far fa-paragraph"></span>
        )
      case 'img':
        return (
          <span className="far fa-image"></span>
        )
      case 'a':
      return (
        <span className="fas fa-link"></span>
      )
      case 'blockquote':
        return (
          <span className="fas fa-quote-left"></span>
        )
      case 'ul':
        return (
          <span className="fas fa-list-ul"></span>
        )
      case 'ol':
        return (
          <span className="fas fa-list-ol"></span>
        )

      default:
    }
  }

  render() {
    const selected = {
      borderStyle: this.props.isSelected ? 'solid' : '',
      borderWidth: '1px',
      borderColor: 'rgba(255, 255, 255, .6)'
    }

    return (
      <div onClick={() => this.props.action_updateSelectedContent(this.props.index)} style={selected}className="contentContainer flexH aic pa-xs nowrap">
        <div style={{color: this.props.bgColor}} className="nodeContainerHeader mr-xs flexH aic jcc">
          { this.renderIcon() }
        </div>
          <div>
            {/* TODO: Conditional render via a function depending on this.props.context */}
            <Field 
              value={this.props.nodes[this.props.selectedNode].content[this.props.index].content}
              placeholder = 'Enter Content Here'
              callback = {this.updateContent}
              //noBorder = {this.props.isSelected ? false : true}
            />
          </div>
        {this.props.isSelected ?
          <div className="mla">
            <Button 
              payload = ""
              icon = "fas fa-plus"
              callback = {this.props.callback}
              bgColor = {this.props.bgColor}
              textColor = 'white'
            />
            <Button 
              payload = ""
              icon = "fas fa-trash-alt"
              callback = {this.deleteContent}
              bgColor = {this.props.bgColor}
              textColor = 'white'
            />
          </div>
          : null
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { bgColor, path, selectedNode } = state
	const { nodes } = path

  return {
      bgColor,
      path,
      nodes,
      selectedNode

  }
}

let actions = {
  action_updateSelectedContent
}

export default connect(mapStateToProps, actions)(Content)
