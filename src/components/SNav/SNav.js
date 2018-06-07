import React, { Component } from 'react';
import Button from '../Button/Button'
import { connect } from 'react-redux'

import '../../spacers.css'
import './SNav.css'
//import '../../debug.css'

class SNav extends Component {
	constructor() {
    super()
    this.state = {
		}
		this.updateContext = this.updateContext.bind(this)
	}
	
	updateContext(val) {
		this.props.callback(val)
	}

	render(){
		const renderButtons = this.props.payload.map((e,i) => {
			return (
				<div key = {e} className="buttonWrapper">
					<Button 
						payload = {e}
						callback = {this.updateContext}
						bgColor = {this.props.bgColor}
						textColor = '#ffffff'
						selected = {this.props.selected.toLowerCase() === e.toLowerCase() ? true : false}
					/>
				</div>
			)
		})

		return(
			<div className="flexH aic">
				{renderButtons}
			</div>
		)
	}
}

function mapStateToProps(state) {
  const { bgColor, userContext, pathContext } = state

  return {
      bgColor,
			userContext,
			pathContext
  }
}

export default connect(mapStateToProps)(SNav)
