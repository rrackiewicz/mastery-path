import React, { Component } from 'react'
import { connect } from 'react-redux'
import IconToggle from '../IconToggle/IconToggle'
import Content from '../Content/Content'
import { action_updateSelectedContent, action_add_content, action_updateContentOrder } from '../../ducks/reducer'

import '../../spacers.css'
import './PanelNodeEditor.css'
//import '../../debug.css'

class PanelNodeEditor extends Component {
	constructor() {
    super()
    this.state = {
			iconArray: ['h1', 'h3', 'p', 'img', 'caption', 'a', 'blockquote', 'ul', 'ol'],
			selectedIcon: 'h1',
			isPreview: false
		}
		this.addContent = this.addContent.bind(this)
		this.updateSelectedIcon = this.updateSelectedIcon.bind(this)
		this.swapContent = this.swapContent.bind(this)
	}

	//button will try to pass context back as val even though unused
	addContent(val){
		//FIXME: Insert 0 into the appropriate position in selectedContent
		this.props.action_add_content(this.state.selectedIcon)
		//need to splice the selectedContent array in the same place
		this.props.action_updateSelectedContent(this.props.selectedContentAtSelectedNode + 1)
		this.jumpTo("bottom")
	}

	updateSelectedIcon(context){
		this.setState({selectedIcon: context})
	}

	swapContent(direction){
		let { selectedContentAtSelectedNode } = this.props
		if (direction === 'up' && selectedContentAtSelectedNode > 0) {
			this.props.action_updateContentOrder(selectedContentAtSelectedNode - 1)
			this.props.action_updateSelectedContent(selectedContentAtSelectedNode - 1)
		}
		else if (selectedContentAtSelectedNode < this.props.nodes[this.props.selectedNode].content.length-1) {
			this.props.action_updateContentOrder(selectedContentAtSelectedNode + 1)
			this.props.action_updateSelectedContent(selectedContentAtSelectedNode + 1)
		}
	}

	jumpTo(location){
		let messages = document.querySelector(".mainWrapper");
		location === "bottom" ? messages.scrollTop = messages.scrollHeight : messages.scrollTop = 0
	}

	render(){

		//console.log(`Selected Node tree for node ${this.props.selectedNode}: ${this.props.selectedContent}`)
		const mainWidth = {
			width : this.props.mainWidth,
		}
		
		const renderNodeContent = this.props.nodes[this.props.selectedNode].content.map((e,i) => {
			return (
				<Content 
					key = {e+i}
					index = {i}
					callback = {this.addContent}
					context = {e.content_type}
					isSelected = {this.props.selectedContentAtSelectedNode === i ? true : false}
				/>
			)
		})

		return (
			<div className="">
				<div style={mainWidth} className="pathBuilderToolbar flexH aic toolIcon">
					<IconToggle 
						payload = ""
						icon = "fas fa-arrow-up"
						callback = {this.swapContent}
						addNodeCallback = {this.jumpTo}
						context = "up"
						bgColor = {this.props.bgColor}
						textColor = '#ffffff'
					/>
					<IconToggle 
						payload = ""
						icon = "fas fa-arrow-down"
						callback = {this.swapContent}
						context = "down"
						bgColor = {this.props.bgColor}
						textColor = '#ffffff'
					/>

					<div style={{color: this.props.bgColor}} className="ml-s pa-xs toolDivider">
						<span>|</span>
					</div>

					<IconToggle 
						payload = ""
						icon = "fas fa-plus"
						callback = {this.addContent}
						bgColor = {this.props.bgColor}
						textColor = '#ffffff'
						isLarge
					/>
					<IconToggle 
						payload = ""
						icon = "fas fa-h1"
						callback = {this.updateSelectedIcon}
						bgColor = {this.props.bgColor}
						context = 'h1'
						textColor = '#ffffff'
						isToggled = {this.state.selectedIcon === 'h1' ? true : false }
					/>
					<IconToggle 
						payload = ""
						icon = "fas fa-h3"
						callback = {this.updateSelectedIcon}
						context = 'h3'
						bgColor = {this.props.bgColor}
						textColor = '#ffffff'
						isToggled = {this.state.selectedIcon === 'h3' ? true : false }
					/>
					<IconToggle 
						payload = ""
						icon = "far fa-paragraph"
						callback = {this.updateSelectedIcon}
						context="p"
						bgColor={this.props.bgColor}
						textColor = '#ffffff'
						isToggled = {this.state.selectedIcon === 'p' ? true : false }
					/>
					<IconToggle 
						payload = ""
						icon = "far fa-image"
						callback = {this.updateSelectedIcon}
						context = 'img'
						bgColor={this.props.bgColor}
						textColor = '#ffffff'
						isToggled = {this.state.selectedIcon === 'img' ? true : false }
					/>
					<IconToggle 
						payload = ""
						icon = "fas fa-closed-captioning"
						callback = {this.updateSelectedIcon}
						context = 'caption'
						bgColor={this.props.bgColor}
						textColor = '#ffffff'
						isToggled = {this.state.selectedIcon === 'caption' ? true : false }
					/>
					<IconToggle 
						payload = ""
						icon = "fas fa-link"
						callback = {this.updateSelectedIcon}
						context = 'a'
						bgColor={this.props.bgColor}
						textColor = '#ffffff'
						isToggled = {this.state.selectedIcon === 'a' ? true : false }
					/>
					<IconToggle 
						payload = ""
						icon = "fas fa-quote-left"
						callback = {this.updateSelectedIcon}
						context = 'blockquote'
						bgColor={this.props.bgColor}
						textColor = '#ffffff'
						isToggled = {this.state.selectedIcon === 'blockquote' ? true : false }
					/>
					<IconToggle 
						payload = ""
						icon = "fas fa-list-ul"
						callback = {this.updateSelectedIcon}
						context = 'ul'
						bgColor={this.props.bgColor}
						textColor = '#ffffff'
						isToggled = {this.state.selectedIcon === 'ul' ? true : false }
					/>

					<IconToggle 
						payload = ""
						icon = "fas fa-list-ol"
						callback = {this.updateSelectedIcon}
						context = 'ol'
						bgColor={this.props.bgColor}
						textColor = '#ffffff'
						isToggled = {this.state.selectedIcon === 'ol' ? true : false }
					/>

					<div style={{color: this.props.bgColor}} className="ml-s pa-xs toolDivider">
						<span>|</span>
					</div>

					<IconToggle 
						payload = ""
						icon = "fas fa-arrow-to-top"
						callback={this.jumpTo}
						context="top"
						bgColor={this.props.bgColor}
						textColor = '#ffffff'
					/>
					<IconToggle 
						payload = ""
						icon = "fas fa-arrow-to-bottom"
						callback={this.jumpTo}
						context="bottom"
						bgColor={this.props.bgColor}
						textColor = '#ffffff'
					/>

						<span className="mla">
						<IconToggle 
							payload = ""
							icon = "fas fa-expand-alt"
							//callback = {this.expandEditor}
							bgColor = {this.props.bgColor}
							context = 'h1'
							textColor = '#ffffff'
							//isToggled = {this.state.isExpanded ? true : false }
						/>
					</span>

					<span className="">
						<IconToggle 
							payload = ""
							icon = "fas fa-eye"
							//callback = {this.togglePreview}
							bgColor = {this.props.bgColor}
							context = 'h1'
							textColor = '#ffffff'
							//isToggled = {this.state.isPreview ? true : false }
						/>
					</span>
			
				</div>
				<div style={mainWidth} className="panelMain">
					{ renderNodeContent }
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	const { bgColor, mainWidth, path, selectedContent, selectedNode} = state
	const { nodes } = path

	//FIXME: Now that selectedContent is an array, the actual selectedContent is the selectedContent at the currently selected node. This has been updated in one location in this file.
	const selectedContentAtSelectedNode = selectedContent[selectedNode]
  return {
			bgColor,
			mainWidth,
			path,
			selectedContent,
			selectedNode,
			selectedContentAtSelectedNode,
			nodes
  }
}

const actions = {
	action_updateSelectedContent,
	action_add_content,
	action_updateContentOrder
}

export default connect(mapStateToProps, actions)(PanelNodeEditor)
