import React, {Component} from 'react'
import { connect } from 'react-redux'
import Field from '../Field/Field'
import Button from '../Button/Button'
import BoxHeader from '../BoxHeader/BoxHeader'
import { action_add_node, action_updateNodeName, action_delete_node, action_updateSelectedNode, action_updateNodeIsComplete } from '../../ducks/reducer'
import { depthToDewey, extractDepth, nextSibling } from '../../helpers'

import '../../spacers.css'
import './Node.css'
//import '../../debug.css'

class Node extends Component {
  constructor(){
    super()
    this.state = {

    }
    this.updateNodeName = this.updateNodeName.bind(this)
    this.insertNode = this.insertNode.bind(this)
    this.stickyPath = this.stickyPath.bind(this)
    this.deleteNode = this.deleteNode.bind(this)
    this.updateSelectedNode = this.updateSelectedNode.bind(this)
    this.updateCompletion = this.updateCompletion.bind(this)
  }

  updateNodeName(e) {
    this.props.action_updateNodeName(this.props.index, e.target.value)
  }

  insertNode(){
    const { nodes, index, action_add_node } = this.props
    let newIndex = index + 1;
    const depth = nodes[index].depth
    
    //There are two conditions that determines the index that is passed in
    //Condition 1: If the depth of the next node > depth of current node then pass in the index of the next sibling
    if (extractDepth(nodes)[index] < extractDepth(nodes)[index+1]) {
      newIndex = nextSibling(extractDepth(nodes), index)
      action_add_node(newIndex, depth)
      newIndex++ //Have to increment after setting the depth
    } else {
      action_add_node(index, depth)
    }
    //TODO: Call action to insert row in selectedNode array with value of 0. NOTE: I have already done this in Redux. So if it doesn't work, try this.
    //this needs to vary depending on index returned
    this.props.action_updateSelectedNode(newIndex)
    //FIXME: Not a perfect implementation of jumping to bottom but good enough
    if (nodes.length === newIndex ) { this.props.addNodeCallback("bottom") }
  }

  stickyPath(){

  }

  deleteNode(){
    this.props.action_delete_node(this.props.index)
  }

	updateSelectedNode() {
		this.props.action_updateSelectedNode(this.props.index)
  }

  updateCompletion() {
    this.props.action_updateNodeIsComplete(this.props.index, !this.props.isComplete)
  }


  render() {
    //console.log(`Node props for id:${this.props.index} is: `,  this.props)
    // console.log(this.props.selectedNode)
    const indent = {
      marginLeft: `calc(38px * ${this.props.nodes[this.props.index].depth})`,
      //borderStyle: this.props.isSelected ? 'solid' : '',
      borderWidth: '2px',
      borderColor: 'rgba(255, 255, 255, .6)',
      background:  this.props.isSelected ? 'rgba(255, 255, 255, .5)' : ''
    }

    return (
      <div onClick={this.updateSelectedNode} style={indent} className="nodeContainer flexH aic pa-xs nowrap">
        <div className="mr-xs">
          <BoxHeader
            payload = {depthToDewey(extractDepth(this.props.nodes))[this.props.index]}
            isFilled = {this.props.isComplete}
            width = {34}
            height = {34}
            bgColor = {this.props.bgColor}
            textColor = '#ffffff'
          />
        </div>
        <div className="fone">
          <Field 
            value={this.props.nodes[this.props.index].node_name}
            placeholder = 'Type Node Name'
            callback = {this.updateNodeName}
            //noBorder = {this.props.isSelected ? false : true}
          />
        </div>
        {this.props.isSelected ?
          <div className="mla">
            <Button 
              payload = ''
              icon = {this.props.isComplete ? "far fa-check-square fa-lg" : "far fa-square fa-lg"}
              callback = {this.updateCompletion}
              bgColor = {this.props.bgColor}
              textColor = 'white'
            />
            <Button 
              payload = "Edit"
              callback = {this.props.callback}
              bgColor = {this.props.bgColor}
              textColor = 'white'
            />
            <Button 
              payload = ""
              icon = "fas fa-plus"
              callback = {this.insertNode}
              bgColor = {this.props.bgColor}
              textColor = 'white'
            />
            <Button 
              payload = ""
              icon = "fas fa-trash-alt"
              callback = {this.deleteNode}
              bgColor = {this.props.bgColor}
              textColor = 'white'
            />
            <Button 
              payload = ""
              icon = "fas fa-star"
              callback = {this.stickyPath}
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
      nodes,
      selectedNode
  }
}

let actions = {
  action_add_node,
  action_updateNodeName,
  action_delete_node,
  action_updateSelectedNode,
  action_updateNodeIsComplete
}

export default connect(mapStateToProps, actions)(Node)
