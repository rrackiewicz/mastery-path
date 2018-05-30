import React, { Component } from 'react'
import Search from '../Search/Search'
import { connect } from 'react-redux'
import Pill from '../Pill/Pill'
import Badge from '../Badge/Badge'

import '../../App.css'
import '../../spacers.css'
import './Card.css'
//import '../../debug.css'

class Card extends Component {
  constructor() {
    super()
    this.state = {
      isHovered: false
    }

    this.toggleFollow = this.toggleFollow.bind(this)
  }

  toggleFollow() {
    this.setState({isHovered : !this.state.isHovered})
  }
  
  render() {

    const roundBottom = {
      borderRadius: "0 0 5px 5px" 
    }

    const flatBottom = {
      borderBottom: "none",
      borderRadius: "0"
    }

    const titleImage = {
      backgroundImage: `url(${this.props.img})`
    }

    return (
      <div onMouseEnter={this.toggleFollow} onMouseLeave={this.toggleFollow} className="card flexV jcc" style={{'background' : this.props.bgColor}}>
        <div className="cardTitle" style={titleImage}>
          {this.state.isHovered ? 
            <button className="followButton mt-xs ml-xs">Follow Path</button>
          :
            null
          }
        </div>
        <div className="cardBody" style={this.props.isSearching ? roundBottom : flatBottom}>
          <div className="flexV pa-m">
            <div className="cardBody_Title mb-s">
              {this.props.pathName}
            </div>
            <div className="cardBody_Copy">
              {this.props.abstract}
            </div>
          </div>
          <div className="flexH pl-m pr-m pb-m">
            <div className="flexV">
              <div className="cardBody_Author mb-s">
                {this.props.author}
              </div>
              <div>
                <Pill 
                  payload={this.props.tld}
                />
              </div>
              <div className="mt-s cardBody_Hours">
                <span className="far fa-clock"></span> {this.props.hours} Hours
                <Badge 
                  payload = "$ Accepting Applications"
                />
              </div>
            </div>
            <div className="flexV mla ratingContainer pa-s" >
              <div className="cardBody_Rating ma" style={{'color' : this.props.bgColor}}>{this.props.rating}</div>
              <div className="cardBody_Copy ma" style={{'color' : this.props.bgColor}}>Rating</div>
              <div>&nbsp;</div>
              {/* <div className="cardBody_Copy" style={{'color' : this.props.bgColor}}>Subs</div>
              <div className="cardBody_Copy" style={{'color' : this.props.bgColor}}>Complete</div> */}
            </div>
          </div>
        </div>
        {this.props.isSearching ?
          null
        :
          <div className="cardFooter flexH aic">
            <div className="ma">Progress</div>
          </div>
        }
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

export default connect(mapStateToProps, actions)(Card)
