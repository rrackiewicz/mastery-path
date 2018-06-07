import React, {Component} from 'react'
import { connect } from 'react-redux'
import Field from '../Field/Field'
import Button from '../Button/Button'
import { action_add_node, action_updateNodeName, action_delete_node } from '../../ducks/reducer'
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
    this.editNode = this.editNode.bind(this)
  }

  updateNodeName(e) {
    this.props.action_updateNodeName(this.props.index, e.target.value)
  }

  insertNode(){
    const { nodes, index, action_add_node, callback } = this.props
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
    //this needs to vary depending on index returned
    callback(newIndex)
    //FIXME: Not a perfect implementation of jumping to bottom but good enough
    if (nodes.length === newIndex ) { this.props.addNodeCallback("bottom") }
  }

  stickyPath(){

  }

  deleteNode(){
    console.log(this.props.index)
    this.props.action_delete_node(this.props.index)
  }

  editNode(){

  }

  render() {

    const indent = {
      marginLeft: `calc(38px * ${this.props.nodes[this.props.index].depth})`,
      borderStyle: this.props.isSelected ? 'solid' : '',
      borderWidth: '1px',
      borderColor: 'rgba(255, 255, 255, .6)'
    }

    return (
      <div onClick={() => this.props.callback(this.props.index)} style={indent} className="nodeContainer flexH aic pa-xs nowrap">
        <div style={{color: this.props.bgColor}} className="nodeContainerHeader mr-xs flexH aic jcc">
          {depthToDewey(extractDepth(this.props.nodes))[this.props.index]}
        </div>
          <div>
            <Field 
              value={this.props.nodes[this.props.index].node_name}
              placeholder = 'Name'
              callback = {this.updateNodeName}
              //noBorder = {this.props.isSelected ? false : true}
            />
          </div>
        {this.props.isSelected ?
          <div className="mla">
            <Button 
              payload = "Edit"
              icon = "fas fa-edit"
              callback = {this.editNode}
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
  const { bgColor, path } = state
	const { pid, nodes } = path

  return {
      bgColor,
      pid, 
      nodes
  }
}

let actions = {
  action_add_node,
  action_updateNodeName,
  action_delete_node
}

export default connect(mapStateToProps, actions)(Node)
