import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import '../../App.css'
import './SearchField.css'
import '../../spacers.css'
//import '../../debug.css'

class Search extends Component {
  constructor() {
    super()
    this.state = {
      searchValue: '',
    }

    this.updateInput = this.updateInput.bind(this)
    this.submitForm = this.submitForm.bind(this)
  }

  updateInput(e) {
    this.setState({searchValue : e.target.value})
  }

  submitForm(e) {
    if (e.key === 'Enter') {
      this.props.history.push(`/results/${e.target.value}`)
    }
  } 

  render() {
    return (
        <input onKeyDown={this.submitForm} onChange={this.updateInput} className="pathSearch ml-s mr-l" value={this.state.searchValue} style={{background: this.props.bgColor}} placeholder="Skill Name" type="text"/>
    );
  }
}

function mapStateToProps(state) {
  const { bgColor } = state 
  return {
      bgColor
  }
}

export default connect(mapStateToProps)(withRouter(Search))

