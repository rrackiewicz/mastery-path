import React, { Component } from 'react'
import Button from '../Button/Button'
import '../../spacers.css'
import './Modal.css'
//import './debug.css'

class Modal extends Component {
  constructor() {
    super()
    this.state = {
    }
  }

  render() {

    const modal = {
      background: this.props.bgColor,
      color: this.props.textColor
    }

    return (
      <div className="shroud flexV aic jcc">
        <div className="modal pa-l" style={modal}>
          <div className="flexH">
            {this.props.oneButton ?
              null
              :
              <div onClick={() => {this.props.cancelCallback()}} className="mla">
                <span className="fas fa-times-square" style={{color: 'white'}}></span>
              </div>
            }
          </div>
          <h1 className="mt-m pb-s">
            {this.props.title}
          </h1>
          <p className="mt-m mb-l pb-m">
            {this.props.content}
          </p>
          <div className="flexH">
            {this.props.oneButton ?
              null
              :
              <div className = "mla">
                <Button 
                  payload = {this.props.cancelText}
                  callback = {this.props.cancelCallback}
                  bgColor = {this.props.bgColor}
                  textColor = '#ffffff'
                />
              </div>
            }
            <div className="mla">
              <Button 
                payload = {this.props.okText}
                callback = {this.props.okCallback}
                bgColor = {this.props.bgColor}
                textColor = '#ffffff'
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Modal
