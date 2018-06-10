import React, { Component } from 'react'
import { connect } from 'react-redux'

import '../../spacers.css'
import './Preview.css'
//import '../../debug.css'

class Preview extends Component {
  constructor() {
    super()
    this.state = {

    }

  }

  
  render() {

    const preview = {
      color: 'white',
    }

    return (
      <div style={preview} className="previewContainer pt-s pb-s pl-m mt-m mb-m pt">
        <a href="http://www.powells.com/book/-9780262510875">http://www.powells.com/book/-9780262510875</a>
        <div className="mt-m">
          <img className="favicon" src="https://www.google.com/s2/favicons?domain=powells.com" alt=""/>
          <span style={{fontSize: '1.25rem'}}>&nbsp;&nbsp;Powells.com</span>
        </div>
        <p className="mt-m"><a href="http://www.powells.com/book/-9780262510875">Structure & Interpretation of Programming, 2nd Edition</a></p>
        <p className="mt-s" style={{fontWeight: 'lighter'}}>Structure and Interpretation of Computer Programs has had a dramatic impact on computer science curricula over the past decade. This long-awaited revision contains changes throughout the text. There are new implementations of most of the major programming systems in the book, including the interpreters and compilers, and the authors have incorporated many small changes that reflect their experience teaching the course at MIT since the first edition was published.</p>
        <div className="mt-m">
          <img src="https://images.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F9%2F9d%2FSICP_cover.jpg&f=1" height="150px" alt=""/>
        </div>
      </div>
    );
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

export default connect(mapStateToProps, actions)(Preview)
