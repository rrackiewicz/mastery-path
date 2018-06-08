import React from "react";
import ReactMde from "react-mde";//link to full path instead 
import Showdown from "showdown";
//import "react-mde/lib/styles/css/react-mde-all.css";

import './Editor.css'

export default class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: null,
      htmlToDisplay: ''
    };
    this.converter = new Showdown.Converter({
      tables: true,
      simplifiedAutoLink: true
    });
    this.handleChange = this.handleChange.bind(this);
    this.markdownPreview = this.markdownPreview.bind(this);
  }

  handleChange(editorState) {
    this.setState({ editorState });
  }
  markdownPreview(markdown) {
    let html = this.converter.makeHtml(markdown)
    this.setState({htmlToDisplay: html})
    return Promise.resolve(html)
  }

  render() {
    return (
      <ReactMde
        onChange={this.handleChange}
        editorState={this.state.editorState}
        generateMarkdownPreview={this.markdownPreview}
        layout='tabbed'
      />
    );
  }
}