import React, {Component} from 'react'
import { connect } from 'react-redux'
import Field from '../Field/Field'
import TextArea from '../TextArea/TextArea'
import Button from '../Button/Button'
import Preview from '../Preview/Preview'
import { action_updateSelectedContent, action_updateContentContent, action_delete_content } from '../../ducks/reducer'

import '../../spacers.css'
import './Content.css'
//import '../../debug.css'

class Content extends Component {
  constructor(){
    super()
    this.state = {
      isPasted: false,
    }
    this.deleteContent = this.deleteContent.bind(this)
    this.updateContent = this.updateContent.bind(this)
    this.renderIcon = this.renderIcon.bind(this)
    this.renderContentType = this.renderContentType.bind(this)
  }

  deleteContent(){
    this.props.action_delete_content()
  }

  updateContent(e) {
    //console.log("content: ", e.target.value)
    this.props.action_updateContentContent(e.target.value)
  }

  renderContentType(){
    const { context } = this.props
    //console.log('context',this.props.context)
    switch (context) {
      case 'h1':
      case 'h3':
      case 'caption':
        return (   
          <Field 
            value={this.props.nodes[this.props.selectedNode].content[this.props.index].content}
            placeholder = 'Enter Content Here'
            callback = {this.updateContent}
            //noBorder = {this.props.isSelected ? false : true}
          />
        )
      case 'p':
        return (
          <TextArea 
          value={this.props.nodes[this.props.selectedNode].content[this.props.index].content}
          placeholder = 'Paragraph text is the mortar that binds your content together. Dont plagarize.'
          callback = {this.updateContent}
          rows = {6}
        />
        )
      case 'img':
        return ( 
          <div> 
            <Field 
              value={this.props.nodes[this.props.selectedNode].content[this.props.index].content}
              placeholder = 'Enter Content Here'
              callback = {this.updateContent}
              //noBorder = {this.props.isSelected ? false : true}
            />
            <div style={{backgroundImage: `url(${this.props.nodes[this.props.selectedNode].content[this.props.index].content})`}} className="aContainer mt-s mb-s"></div>
          </div> 
        )
      case 'a':
        return (  
          <div>
          <Field 
            value={this.props.nodes[this.props.selectedNode].content[this.props.index].content}
            placeholder = 'Enter Content Here'
            //enterCallback = {this.isPasted}
            callback = {this.updateContent}
            //noBorder = {this.props.isSelected ? false : true}
          />
          {/*FIXME: This is a KLUDGE */}
          {this.props.nodes[this.props.selectedNode].content[this.props.index].content.length > 0 ?
          <Preview/>
          : null
          }
          </div> 
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
      case 'caption':
      return (
        <span className="fas fa-closed-captioning"></span>
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
      //borderStyle: this.props.isSelected ? 'solid' : '',
      borderWidth: '1px',
      borderColor: 'rgba(255, 255, 255, .6)',
      background:  this.props.isSelected ? 'rgba(255, 255, 255, .4)' : ''
    }

    return (
      <div onClick={() => this.props.action_updateSelectedContent(this.props.index)} style={selected}className="contentContainer flexH aifs pa-xs nowrap">
        <div style={{color: this.props.bgColor}} className="nodeContainerHeader mr-xs flexH aic jcc">
          { this.renderIcon() }
        </div>
        <div className="fone">
          {this.renderContentType()}
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
  action_updateSelectedContent,
  action_updateContentContent,
  action_delete_content
}

export default connect(mapStateToProps, actions)(Content)
