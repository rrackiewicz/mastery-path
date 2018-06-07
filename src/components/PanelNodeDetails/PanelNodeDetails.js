import React, { Component } from 'react';
import Button from '../Button/Button'
import Pill from '../Pill/Pill'
import Field from '../Field/Field'
import Error from '../Error/Error'
import TextArea from '../TextArea/TextArea'
import { connect } from 'react-redux'

import '../../spacers.css'
import './PanelNodeDetails.css'
//import '../../debug.css'

class PanelNodeDetails extends Component {
	constructor() {
    super()
    this.state = {
			path : {

			}
		}
	}

	render(){
		const titleOverlay = {
			backgroundColor: this.props.bgColor,
			padding: '7px'
		}


		return(
			<div className="panel mt-s">
				<h3 style={titleOverlay} className="panelTitle">Node Details</h3>
			</div>
		)
	}
}

function mapStateToProps(state) {
  const { bgColor } = state

  return {
      bgColor
  }
}

let actions = {

}

export default connect(mapStateToProps, actions)(PanelNodeDetails)
