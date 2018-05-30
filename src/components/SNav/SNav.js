import React, { Component } from 'react';
import SNavItem from '../SNavItem/SNavItem'
import Avatar from '../Avatar/Avatar'
import { connect } from 'react-redux'

class SNav extends Component {
	constructor() {
    super()
    this.state = {
			selected: 'Meta Data'
    }
  }

	render(){
		return(
			<div className="flexH aic ml-xl">
				{this.props.userContext === 'apprentice' ?
					<SNavItem
						payload = {['Meta Data', 'Sockets', 'Sharing', 'Oversight']}
						selected = {this.state.selected}
					/>
					:
					<SNavItem
						payload = {['Feed', 'Paths', 'Lexicon']}
						selected = {this.state.selected}
					/>
				}
				<div>
					<Avatar/>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
  const { bgColor, path, userContext } = state
  const { pid } = path

  return {
      bgColor,
      pid,
			userContext
  }
}

let actions = {
}

export default connect(mapStateToProps)(SNav)
