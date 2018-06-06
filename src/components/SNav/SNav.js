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
			payload: [],
			selected: ''
		}
		this.updateContext = this.updateContext.bind(this)
	}
	
	componentDidMount() {
		let payload = []
		
		if (this.props.userContext === 'master' & this.props.pathContext === 'path') {
			payload = ['Details', 'Sockets', 'Sharing', 'Oversight']
			this.setState({selected: payload[0]})
		} 

		if (this.props.userContext === 'master' & this.props.pathContext === 'node') {
			payload = ['Details', 'Resources', 'Prereqs', 'Domains']
			this.setState({selected: payload[0]})
		}

		if (this.props.userContext === 'apprentice' & this.props.pathContext === 'path') {
			payload = ['Contract', 'Support', 'Lexicon']
			this.setState({selected: payload[0]})
		} 

		if (this.props.userContext === 'apprentice' & this.props.pathContext === 'node') {
			payload = ['Details', 'Resources', 'Prereqs', 'Domains']
			this.setState({selected: payload[0]})
		}
	
		this.setState({ payload })				
	}

	//This isn't going to work because the callback doesn't pass a value
	updateContext(val) {
		this.setState({selected: val})
		this.props.activePanel(val)
	}

	render(){
		const renderButtons = this.state.payload.map((e,i) => {
			return (
				<div key = {e} className="buttonWrapper">
					<Button 
						payload = {e}
						callback = {this.updateContext}
						bgColor = {this.props.bgColor}
						textColor = '#ffffff'
						selected = {this.state.selected.toLowerCase() === e.toLowerCase() ? true : false}
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
