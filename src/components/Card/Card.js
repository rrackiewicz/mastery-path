import React, { Component } from 'react'
import { connect } from 'react-redux'
import Rating from 'react-rating'
import Pill from '../Pill/Pill'
import Badge from '../Badge/Badge'

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
    this.packagePath = this.packagePath.bind(this)
  }

  toggleFollow() {
    this.setState({isHovered : !this.state.isHovered})
  }

  packagePath() {
    const path = {
      pid: this.props.pid,
      path_name: this.props.pathName,
      abstract: this.props.abstrctFull,
      img: this.props.img, 
      learningDomain: this.props.tld,
    }
    this.props.callback(path);
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

    const rating = {
      color: this.props.bgColor,
    }

    return (
      <div onMouseEnter={this.toggleFollow} onMouseLeave={this.toggleFollow} className="card flexV jcc" style={{'background' : this.props.bgColor}}>
        <div className="cardTitle" style={titleImage}>
          {this.state.isHovered ? 
            <button className="followButton mt-xs ml-xs">{this.props.badge}</button>
          :
            null
          }
        </div>
        <div className="cardBody" style={this.props.isSearching ? roundBottom : flatBottom}>
          <div className="flexV pa-m">
            <div onClick={this.packagePath} className="cardBody_Title mb-s">
              <span className="links dottedHorizontalBorder">
                {this.props.pathName}
              </span>
            </div>
            <div className="cardBody_Copy">
              {this.props.abstract}
            </div>

          </div>
          <div className="flexH pl-m pr-m pb-m">
            <div className="flexV">
              <div className="cardBody_Author mb-xs">
                <span className="links dottedHorizontalBorder">
                  {this.props.author}
                </span>
              </div>
              <div className="mt-s cardBody_Hours">
                <span className="far fa-clock fa-sm"></span> {this.props.hours} Hours
              </div>
              <div>
                <Badge 
                  payload = "$ Accepting Applications"
                />
              </div>
            </div>
            <div className="flexV mla ratingContainer pa-s" style={rating}> 
              <Rating 
                initialRating = {(Math.round(this.props.rating * 2) / 2).toFixed(1)}
                emptySymbol="fal fa-star fa-xs"
                fullSymbol="fas fa-star fa-xs"
                fractions={2}
                readonly
              />
              <div className="cardBody_Rating mt-s">
                <span>{(this.props.rating * 1).toFixed(1)}</span> out of 5 rating
              </div>
            
              {/* <div className="cardBody_Rating ma" style={{'color' : this.props.bgColor}}>{this.props.rating}</div> */}
              {/* <div className="cardBody_Copy ma" style={{'color' : this.props.bgColor}}>Rating</div> */}
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
