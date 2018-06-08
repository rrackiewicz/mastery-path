import React, { Component } from 'react'
import Node from '../Node/Node'
import { action_updateNodeOrder, action_updateNodeDepth } from '../../ducks/reducer'
import { connect } from 'react-redux'
import IconToggle from '../IconToggle/IconToggle'

import '../../spacers.css'
import './PanelMarkdownEditor.css'
//import '../../debug.css'

class PanelMarkdownEditor extends Component {
	constructor() {
    super()
    this.state = {
			iconArray: ['h1', 'h3', 'p', 'img', 'a', 'blockquote', 'ul', 'ol'],
			selectedIcon: 'h1'
		}
	}

	render(){
		const mainWidth = {
			width : this.props.mainWidth,
    }

		return (
			<div className="">
				<div style={mainWidth} className="pathBuilderToolbar flexH aic toolIcon">
					
					<IconToggle 
						payload = ""
						icon = "fas fa-arrow-up"
						callback = {this.indentNode}
						context = {-1}
						bgColor = {this.props.bgColor}
						textColor = '#ffffff'
					/>
					<IconToggle 
						payload = ""
						icon = "fas fa-arrow-down"
						//callback = {this.indentNode}
						context = {1}
						bgColor = {this.props.bgColor}
						textColor = '#ffffff'
					/>

					<div style={{color: this.props.bgColor}} className="ml-s pa-xs toolDivider">
						<span>|</span>
					</div>

					<IconToggle 
						payload = ""
						icon = "fas fa-plus-square"
						//callback = {this.addContent}
						bgColor = {this.props.bgColor}
						textColor = '#ffffff'
						isLarge
					/>
					<IconToggle 
						payload = ""
						icon = "fas fa-h1"
						//callback = {this.dispatchContent}
						bgColor = {this.props.bgColor}
						context = 'h1'
						textColor = '#ffffff'
						isToggled = {this.state.selectedIcon === 'h1' ? true : false }
					/>
					<IconToggle 
						payload = ""
						icon = "fas fa-h3"
						//callback = {this.dispatchContent}
						context = 'h3'
						bgColor = {this.props.bgColor}
						textColor = '#ffffff'
						isToggled = {this.state.selectedIcon === 'h3' ? true : false }

					/>
					<IconToggle 
						payload = ""
						icon = "fas fa-paragraph"
						//callback = {this.dispatchContent}
						context="p"
						bgColor={this.props.bgColor}
						textColor = '#ffffff'
						isToggled = {this.state.selectedIcon === 'p' ? true : false }
					/>
					<IconToggle 
						payload = ""
						icon = "far fa-image"
						//callback = {this.dispatchContent}
						context = 'img'
						bgColor={this.props.bgColor}
						textColor = '#ffffff'
						isToggled = {this.state.selectedIcon === 'img' ? true : false }
					/>
					<IconToggle 
						payload = ""
						icon = "fas fa-link"
						//callback = {this.dispatchContent}
						bgColor={this.props.bgColor}
						textColor = '#ffffff'
						isToggled = {this.state.selectedIcon === 'a' ? true : false }
						context = 'a'
					/>
					<IconToggle 
						payload = ""
						icon = "fas fa-quote-left"
						//callback = {this.dispatchContent}
						context = 'blockquote'
						bgColor={this.props.bgColor}
						textColor = '#ffffff'
						isToggled = {this.state.selectedIcon === 'blockquote' ? true : false }
					/>
					<IconToggle 
						payload = ""
						icon = "fas fa-list-ul"
						//callback = {this.dispatchContent}
						context = 'ul'
						bgColor={this.props.bgColor}
						textColor = '#ffffff'
						isToggled = {this.state.selectedIcon === 'ul' ? true : false }
					/>

					<IconToggle 
						payload = ""
						icon = "fas fa-list-ol"
						//callback = {this.dispatchContent}
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

					<div style={{color: this.props.bgColor}} className="ml-s pa-xs toolDivider">
						<span>|</span>
					</div>

					<IconToggle 
						payload = ""
						icon = "fas fa-compress"
						// callback={this.contractNodes}
						context="collapse"
						bgColor={this.props.bgColor}
						textColor = '#ffffff'
					/>
					<IconToggle 
						payload = ""
						icon = "fas fa-expand"
						// callback={this.contractFavorites}
						context="expand"
						bgColor={this.props.bgColor}
						textColor = '#ffffff'
					/>
					
				</div>
				<div style={mainWidth} className="panelMain">
					{/* { renderNodeContent } */}
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	const { bgColor, mainWidth, path, selectedContent} = state
	const { nodes } = path
	const { content } = nodes

  return {
			bgColor,
			mainWidth,
			content,
			selectedContent
  }
}

const actions = {
}

export default connect(mapStateToProps, actions)(PanelMarkdownEditor)
