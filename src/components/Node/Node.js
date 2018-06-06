import React, {Component} from 'react'
import { connect } from 'react-redux'
import Field from '../Field/Field'
import Button from '../Button/Button'
import { action_add_node } from '../../ducks/reducer'
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
  }

  updateNodeName(e) {
    this.setState({nodeName: e.target.value})
  }

  insertNode(){
    const { nodes, index, depth, action_add_node, callback } = this.props
    let newIndex = index + 1;
    
    //There are two conditions that determines the index that is passed in
    //Condition 1: If the depth of the next node > depth of current node then pass in the index of the next sibling
    if (extractDepth(nodes)[index] < extractDepth(nodes)[index+1]) {
      newIndex = nextSibling(extractDepth(nodes), index) + 1
      action_add_node(newIndex, depth)
    } else {
      action_add_node(index, depth)
    }
    //this needs to vary depending on index returned
    callback(newIndex)
  }

  render() {

    const indent = {
      marginLeft: `calc(38px * ${this.props.depth})`,
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
              value={this.props.value}
              placeholder = 'Choose wisely!'
              callback = {this.updateNodeName}
              //noBorder = {this.props.isSelected ? false : true}
            />
          </div>
        {this.props.isSelected ?
          <div className="mla">
            <Button 
              payload = "Edit"
              icon = "fas fa-edit"
              callback = {this.resetPath}
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
              callback = {this.resetPath}
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
  action_add_node
}

export default connect(mapStateToProps, actions)(Node)
