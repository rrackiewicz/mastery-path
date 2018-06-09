import React, { Component } from 'react';
import Field from '../Field/Field'
import Dropdown from '../Dropdown/Dropdown'
import { connect } from 'react-redux'
import { depthToDewey, extractDepth, nearestParent, rootParent } from '../../helpers'
import { action_updateNodeName } from '../../ducks/reducer'

import '../../spacers.css'
import './PanelNodeDetails.css'
//import '../../debug.css'

class PanelNodeDetails extends Component {
	constructor() {
    super()
    this.state = {
			nearestParent: 0,
			rootParent: 0,
			dotNotationToNearestParent: '',
			dotNotationToRootParent: ''
		}

		this.updateNodeName = this.updateNodeName.bind(this)
		this.generateDotNotation = this.generateDotNotation.bind(this)
	}

	updateNodeName(e) {
    this.props.action_updateNodeName(this.props.selectedNode, e.target.value)
	}
	
	getNearestParent(){
		const parentReturned = nearestParent(extractDepth(this.props.nodes), this.props.selectedNode)
		const dotNotationReturned = this.generateDotNotation(parentReturned)
		if (this.state.dotNotationToNearestParent !== dotNotationReturned) {this.setState({dotNotationToNearestParent: dotNotationReturned})}
		if (this.state.nearestParent !== parentReturned) {this.setState({ nearestParent: parentReturned })}
		return parentReturned
	}

	getRootParent(){
		const parentReturned = rootParent(extractDepth(this.props.nodes), this.props.selectedNode)
		const dotNotationReturned = this.generateDotNotation(this.props.selectedNode)
		if (this.state.dotNotationToRootParent !== dotNotationReturned) {this.setState({dotNotationToRootParent: dotNotationReturned})}
		if (this.state.rootParent !== parentReturned) {this.setState({ rootParent: parentReturned })}
		return parentReturned
	}

	generateDotNotation(i){
		const rootIndex = rootParent(extractDepth(this.props.nodes), i)
		const deweyGraph = depthToDewey(extractDepth(this.props.nodes))
		const newGraph = deweyGraph.slice(rootIndex, i + 1)
		const dotGraph = newGraph.reduce((a,e)=> a + '.' + e) 
		return dotGraph
	}

	render(){
		const titleOverlay = {
			backgroundColor: this.props.bgColor,
			padding: '7px'
		}

		return(
			<div className="panel mt-s">
				<h3 style={titleOverlay} className="panelTitle">Node Details</h3>

				<div>
					<label>Resource Type</label>
					<div className="flexH mt-xs">
						<Dropdown 
							payload = {['Resource (most common)', 'Bibliography', 'Practice', 'Assessment', 'Survey', 'Path Link']}
							defaultOption = 'Resource (most common)'
							//callback = {this.updateNodeType}
							bgColor = {this.props.bgColor}
							textColor = '#ffffff'
          	/>
					</div>
				</div>

				<div className="mt-m">
					<label>Node Name</label>
					<div className="flexH mt-xs">
						<div style={{color: this.props.bgColor}} className="nodeContainerHeader flexH aic jcc">
          	{depthToDewey(extractDepth(this.props.nodes))[this.props.selectedNode]}
        		</div>
						<Field 
							value={this.props.nodes[this.props.selectedNode].node_name}
							placeholder = 'Type Node Name'
							callback = {this.updateNodeName}
						/>
					</div>
				</div>

				<div className="mt-m">
					<label>Nearest Parent</label>
					<div className="flexH mt-xs">
						<div style={{color: this.props.bgColor}} className="nodeContainerHeader flexH aic jcc">
							{depthToDewey(extractDepth(this.props.nodes))[this.getNearestParent()]}
        		</div>
						<Field 
							value={this.props.nodes[this.state.nearestParent].node_name + ' ' + this.state.dotNotationToNearestParent}
							isDisabled
						/>
					</div>
				</div>

				<div className="mt-m">
					<label>Root Parent</label>
					<div className="flexH mt-xs">
						<div style={{color: this.props.bgColor}} className="nodeContainerHeader flexH aic jcc">
          		{depthToDewey(extractDepth(this.props.nodes))[this.getRootParent()]}
        		</div>
						<Field 
							value={this.props.nodes[this.state.rootParent].node_name + ' ' + this.state.dotNotationToRootParent}
							placeholder = 'Type Node Name'
							isDisabled
						/>
					</div>
				</div>

			</div>
		)
	}
}

function mapStateToProps(state) {
  const { bgColor, path, selectedNode } = state
	const { pid, nodes } = path
  return {
			bgColor,
			pid, 
			nodes,
			selectedNode
  }
}

let actions = {
	action_updateNodeName
}

export default connect(mapStateToProps, actions)(PanelNodeDetails)
