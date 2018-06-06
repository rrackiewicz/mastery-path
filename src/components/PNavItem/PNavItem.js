import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './PNavItem.css'
import '../../spacers.css'
//import '../../debug.css'

class NavItem extends Component {
  constructor() {
    super()
    this.state = {
    }
  }

  render() {

    //CONDITIONAL RENDERING BROKEN IN STYLE BELOW
    const selected = {
      color: 'rgba(255, 255, 255, 1)',
    }

    const unselected = {
      fontWeight: '300',
      color: 'rgba(255, 255, 255, .6)',

    }

    const navItems = this.props.payload.map((e,i)=> {
      return (
        <div className="navContainer mr-xl" key={e}>
          <Link style={{ textDecoration: 'none', color: 'white'}} to={`/${e.toLowerCase()}`}><div style={this.props.selected.toLowerCase() === e.toLowerCase() ? selected : unselected} className="navItem" >{e}</div></Link>
        </div>
      )
    })

    return (
      <div>
        {navItems}
      </div>

    )

  }
}

export default NavItem

