import React, { Component } from 'react';
import PNavItem from '../PNavItem/PNavItem'
import Avatar from '../Avatar/Avatar'
import { connect } from 'react-redux'

import './Nav.css'
import '../../spacers.css'
//import '../../debug.css'

class Nav extends Component {
	constructor() {
    super()
    this.state = {
			selected: 'FEED'
    }
  }

	render(){
		return(
			<div className="flexH aic ml-xl">
				{this.props.userContext === 'apprentice' ?
					<PNavItem
						payload = {['Feed', 'Paths', 'Practice', 'Vitae', 'Lexicon']}
						selected = {this.state.selected}
					/>
					:
					<PNavItem
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
  const { bgColor, path, isLoggedIn, userContext } = state
  const { pid } = path

  return {
      bgColor,
      pid,
			isLoggedIn,
			userContext
  }
}

export default connect(mapStateToProps)(Nav)
