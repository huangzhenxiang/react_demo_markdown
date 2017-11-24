import React, { Component } from 'react';
import marked from 'marked'
import './home.css'
/**
Markdown Previewer
Title
MarkdownInput
MarkdownView
*/
// tutorial1.js
class Title extends Component {
  render () {
    return (
      <h1>React Markdown Previewer</h1>
    );
  }
}

class UploadInput extends Component {
  constructor (props) {
    super(props)
    this.state = {
      msg: 'test'
    }
  }
  handleUpload (event) {
    this.props.onInputChange(event)
    document.querySelector('.view').click()
  }
  handleChange (e) {
    this.setState({
      msg: e.target.value
    })
  }
  render () {
    return (
    <p>
      <span>{this.state.msg}</span>
      <input onChange={this.handleUpload.bind(this)} name="file" id="markdown_file" type='file'></input>
      <input type="text" value={this.state.msg} onChange={this.handleChange.bind(this)}/>
    </p>)
  }
}

class CopyBtn extends Component {
  render () {
    return (<button class="btn" data-clipboard-text="Just because you can doesn't mean you should — clipboard.js">
              Copy to clipboard
          </button>)
  }
}

class MarkdownInput extends Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange (event) {
    this.props.onMarkdownChange(event.target.value);
  }
  render () {
    return (<p><textarea value={this.props.message} onChange={this.handleChange}></textarea></p>);
  }
}

class MarkdownView extends Component{
  constructor (props) {
    super(props);
    this.rawMarkup = this.rawMarkup.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  rawMarkup () {
    var rawMarkup = marked(this.props.message);
    return {
      __html: rawMarkup
    };
  }
  handleClick (event) {
    var sel, range;
    var el = event.target; //get element id
    if (window.getSelection && document.createRange) { //Browser compatibility
      sel = window.getSelection();
      if (sel.toString() === '') { //no text selection
        window.setTimeout(function() {
          range = document.createRange(); //range object
          range.selectNodeContents(el); //sets Range
          sel.removeAllRanges(); //remove all ranges from selection
          sel.addRange(range); //add Range to a Selection.
        }, 1);
      }
    } else if (document.selection) { //older ie
      sel = document.selection.createRange();
      if (sel.text === '') { //no text selection
        range = document.body.createTextRange(); //Creates TextRange object
        range.moveToElementText(el); //sets Range
        range.select(); //make selection.
      }
    }
  }
  render () {
    return (
      <div className="view" onClick = {this.handleClick} dangerouslySetInnerHTML={this.rawMarkup()}>
      </div>
    );
  }
}

var md = `Heading
=======

Sub-heading
-----------
 
### Another deeper heading
 
> Paragraphs are separated
by a blank line.

Leave 2 spaces at the end of a line to do a  
line break

Text attributes *italic*, **bold**, \`code\`
 ~~strikethrough~~ .

Shopping list:

  * apples
  * oranges
  * pears

Numbered list:

  1. apples
  2. oranges
  3. pears

The rain---not the reign---in
Spain.

 *[Herman Fassett](https://freecodecamp.com/hermanfassett)*`;


class Home extends Component {
  constructor (props) {
    super(props);
    this.state = {
      message: md
    };
    this.handleMarkdownChange = this.handleMarkdownChange.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }
  handleMarkdownChange (message) {
    this.setState({
      message: message
    });
  }
  handleUpload (event) {
    var that = this;
    var files = event.target.files;

    for (var i = 0, f; f = files[i]; i++) {
      var reader = new FileReader();
      reader.onload = (function(file) {
        return function(event) {
          that.setState({
            message: this.result
          });
        };
      })(f);
      //读取文件内容
      reader.readAsText(f);
    }
  }
  componentDidMount () {

  }
  render () {
    return (
      <div className="container">
        <Title />
        <div className="editor">
          <UploadInput onInputChange={this.handleUpload} />
          <MarkdownInput message={this.state.message} onMarkdownChange={this.handleMarkdownChange} />
        </div>
        <MarkdownView message={this.state.message} />
      </div>
    )
  }
}

export default Home;
