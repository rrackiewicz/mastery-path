import React, { Component } from 'react';
import Node from '../Node/Node'
import { action_updatePathNodes } from '../../ducks/reducer'

import { connect } from 'react-redux'

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
				selectedNode: 0
		}
		this.handleKeys = this.handleKeys.bind(this)
		this.updateNode = this.updateNode.bind(this)
		this.deleteNode = this.deleteNode.bind(this)
		this.calculateButtons = this.calculateButtons.bind(this)
		this.updateSelectedNode = this.updateSelectedNode.bind(this)
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
	}

	handleKeys(e) {
		switch (e.keyCode) {
			case 37: //left
				break;
			case 38: //up
				this.setState({selectedNode: this.state.selectedNode > 0 ? --this.state.selectedNode : this.state.selectedNode})
				break;
			case 39: //right
				break;
			case 40: //down
				this.setState({selectedNode: this.state.selectedNode < this.props.nodes.length-1 ? ++this.state.selectedNode : this.state.selectedNode})
				break;
			default: 	
		}
	}

	updateNode(id, name) {

	}

	deleteNode(id) {

	}

	calculateButtons(id) {

	}

	updateSelectedNode(id) {
		// console.log("id: ", id)
		this.setState({selectedNode: id})
	}

	render(){

		const mainWidth = {
			width : this.props.windowWidth,
		}

		const renderNodes = this.props.nodes.map((e,i) => {
			return (
				<Node 
					key = {e+i}
					index = {i}
					value = {e.node_name}
					depth = {e.depth}
					callback = {this.updateSelectedNode}
					isSelected = {this.state.selectedNode === i ? true : false}
					// isParent 
				/>
			)
		})

		return (
			<div className="">
				<div style={mainWidth} className="pathBuilderToolbar flexH aic toolIcon">
					<div className="ml-m pa-xs">
						<span className="fas fa-arrow-left"></span>
					</div>
					<div className="ml-m pa-xs">
						<span className="fas fa-arrow-right"></span>
					</div>
					<div className="ml-m pa-xs">
						<span className="fas fa-arrow-up"></span>
					</div>
					<div className="ml-m pa-xs">
						<span className="fas fa-arrow-down"></span>
					</div>

					<div className="ml-m pa-xs toolDivider">
						<span>|</span>
					</div>

					<div className="ml-m pa-xs">
						<span className="fas fa-sort-amount-down"></span>
					</div>
					<div className="ml-m pa-xs">
						<span className="fas fa-sort-amount-up"></span>
					</div>

					<div className="ml-m pa-xs toolDivider">
						<span>|</span>
					</div>

					<div className="ml-m pa-xs">
						<span className="fas fa-arrow-to-top"></span>
					</div>
					<div className="ml-m pa-xs">
						<span className="fas fa-arrow-to-bottom"></span>
					</div>
					<div className="ml-m pa-xs">
						<span className="fas fa-bullseye"></span>
					</div>
				</div>
				<div className="panelMain">
					{ renderNodes }
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
  const { bgColor, userContext, path } = state
	const { pid, nodes } = path

  return {
      bgColor,
			userContext,
			pid,
			nodes
  }
}

let actions = {
	action_updatePathNodes
}

export default connect(mapStateToProps, actions)(PanelBuilder)
