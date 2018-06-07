import React, { Component } from 'react'
import Node from '../Node/Node'
import { action_updateNodeOrder, action_updateNodeDepth } from '../../ducks/reducer'
import { connect } from 'react-redux'
import IconToggle from '../IconToggle/IconToggle'
import Editor from '../Editor/Editor'

import '../../spacers.css'
import './PanelMarkdownEditor.css'
import "react-mde/lib/styles/css/react-mde-all.css";
//import '../../debug.css'

class PanelMarkdownEditor extends Component {
	constructor() {
    super()
    this.state = {
		}
	}


	render(){
		const mainWidth = {
			width : this.props.mainWidth,
    }

		return (
			<div style={{width: this.props.mainWidth}}>
      <Editor />
			</div>
		)
	}
}

function mapStateToProps(state) {
  const { bgColor, mainWidth} = state


  return {
			bgColor,
			mainWidth
  }
}

const actions = {
}

export default connect(mapStateToProps, actions)(PanelMarkdownEditor)
