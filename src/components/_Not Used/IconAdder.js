// Example of higher-order Component
// https://dev.to/ganderzz/tips-on-creating-reusable-components-376j?utm_source=digest_mailer&utm_medium=email&utm_campaign=digest_email
import React, { Component } from 'react'

class IconAdder extends Component {
  render() {
      const { tag, onClick, children, ...rest } = this.props; 
      const Tag = tag;

      return (
          <Tag onClick={onClick} {...rest}>
              <span className={`fas ${icon}`}></span>
              {" "}
              {children}
          </Tag>
      );
  }
}

//to consume it

{/* <IconAdder
    tag={Button}
    onClick={() => alert("Click!")}
    style={ { fontWeight: "800" } }
    title="A button for clicking"
    icon="fa-yen-sign"
>
    Click Me!
</IconAdder> */}