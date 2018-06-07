import React, { Component } from 'react'
import Node from '../Node/Node'
import { action_updateNodeOrder, action_updateNodeDepth } from '../../ducks/reducer'
import { connect } from 'react-redux'
import IconToggle from '../IconToggle/IconToggle'

import '../../spacers.css'
import './PanelPathBuilder.css'
//import '../../debug.css'

class PanelBuilder extends Component {
	constructor() {
    super()
    this.state = {
			selectedNodeRestrictions: {
				up: false,
				down: false,
				left: false,
				right: false
			},
				selectedNode: 0,
			stickNodes: []
		}
		this.handleKeys = this.handleKeys.bind(this)
		this.deleteNode = this.deleteNode.bind(this)
		this.updateSelectedNode = this.updateSelectedNode.bind(this)
		this.indentNode = this.indentNode.bind(this)
		this.swapNodes = this.swapNodes.bind(this)
		this.jumpTo = this.jumpTo.bind(this)
	}

	componentDidMount() {
		window.addEventListener('keyup', this.handleKeys);

		window.addEventListener("keydown", function(e) {
			// space and arrow keys
			if([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
					e.preventDefault();
			}
		}, false);
		
	}

	componentWillUnmount() {
		window.removeEventListener('keyup', this.handleResize);
		window.removeEventListener('keyup', this.handleKeys);
	}

	//eventually will incorporate full 9-key support and scroll will shift to PgUp/PgDown
	handleKeys(e) {
		let { selectedNode } = this.state
		switch (e.keyCode) {
			case 37: //left
				this.indentNode(-1)
				break;
			case 38: //up
				this.setState({selectedNode: selectedNode > 0 ? --selectedNode : selectedNode})
				break;
			case 39: //right
				this.indentNode(1)
				break;
			case 40: //down
				this.setState({selectedNode: selectedNode < this.props.nodes.length-1 ? ++selectedNode : selectedNode})
				break;
			default: 	
		}
	}

	deleteNode(id) {

	}

	updateSelectedNode(id) {
		this.setState({selectedNode: id})
	}

	swapNodes(direction){
		let { selectedNode } = this.state
		if (direction === 'up') {
			this.props.action_updateNodeOrder(selectedNode, selectedNode - 1)
			this.setState({selectedNode: this.state.selectedNode - 1})
		} else {
			this.props.action_updateNodeOrder(selectedNode, selectedNode + 1)
			this.setState({selectedNode: this.state.selectedNode + 1})
		}
	}

	indentNode(indent){
		let { selectedNode } = this.state
		if ((this.props.nodes[selectedNode].depth > 0 && indent < 0) || indent > 0 ) {
			this.props.action_updateNodeDepth(this.state.selectedNode, indent)
		}
	}

	jumpTo(location){
		let messages = document.querySelector(".mainWrapper");
		location === "bottom" ? messages.scrollTop = messages.scrollHeight : messages.scrollTop = 0
	}

	render(){
		const mainWidth = {
			width : this.props.mainWidth,
		}

		const renderNodes = this.props.nodes.map((e,i) => {
			return (
				<Node 
					key = {e+i}
					index = {i}
					callback = {this.updateSelectedNode}
					addNodeCallback = {this.jumpTo}
					isSelected = {this.state.selectedNode === i ? true : false}
					// isParent 
				/>
			)
		})

		return (
			<div className="">
				<div style={mainWidth} className="pathBuilderToolbar flexH aic toolIcon">
					<IconToggle 
						payload = ""
						icon = "fas fa-arrow-left"
						callback = {this.indentNode}
						context = {-1}
						bgColor = {this.props.bgColor}
					/>
					<IconToggle 
						payload = ""
						icon = "fas fa-arrow-right"
						callback = {this.indentNode}
						context = {1}
						bgColor = {this.props.bgColor}
					/>
					<IconToggle 
						payload = ""
						icon = "fas fa-arrow-up"
						callback={this.swapNodes}
						context="up"
						bgColor={this.props.bgColor}
					/>
					<IconToggle 
						payload = ""
						icon = "fas fa-arrow-down"
						callback={this.swapNodes}
						context="down"
						bgColor={this.props.bgColor}
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
					/>
					<IconToggle 
						payload = ""
						icon = "fas fa-arrow-to-bottom"
						callback={this.jumpTo}
						context="bottom"
						bgColor={this.props.bgColor}
					/>
					<IconToggle 
						payload = ""
						icon = "fas fa-bullseye"
						// callback={this.jumpTo}
						context="target"
						bgColor={this.props.bgColor}
					/>

					<div style={{color: this.props.bgColor}} className="ml-s pa-xs toolDivider">
						<span>|</span>
					</div>

					<IconToggle 
						payload = ""
						icon = "fas fa-expand"
						// callback={this.expandNodes}
						context=""
						bgColor={this.props.bgColor}
						// isToggled
					/>
					<IconToggle 
						payload = ""
						icon = "fas fa-compress"
						// callback={this.contractNodes}
						context=""
						bgColor={this.props.bgColor}
					/>
					<IconToggle 
						payload = ""
						icon = "fas fa-star"
						// callback={this.contractFavorites}
						context=""
						bgColor={this.props.bgColor}
					/>
					
				</div>
				<div style={mainWidth} className="panelMain">
					{ renderNodes }
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
  const { bgColor, userContext, path, mainWidth } = state
	const { pid, nodes } = path

  return {
      bgColor,
			userContext,
			pid,
			nodes,
			mainWidth
  }
}

const actions = {
	action_updateNodeOrder,
	action_updateNodeDepth
}

export default connect(mapStateToProps, actions)(PanelBuilder)
