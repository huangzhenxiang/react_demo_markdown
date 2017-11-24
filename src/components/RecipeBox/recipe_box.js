import React, { Component} from 'react';

class AddRecipe extends Component {
  constructor (props) {
    super(props);
    this.state = {
      name: '',
      dec: ''
    }
    this.handClick = this.handClick.bind(this)
    this.handNameChange = this.handNameChange.bind(this)
    this.handDecChange = this.handDecChange.bind(this)
  }
  handClick () {
    this.props.addRecipe({
      title: this.state.name,
      content: this.state.dec.split(',')
    })
    this.setState({
      name: '',
      dec: ''
    })
  }
  handNameChange (e) {
    this.setState({
      name: e.target.value
    })
  }
  handDecChange (e) {
    this.setState({
      dec: e.target.value
    })
  }
  render () {
    return (
      <div className="AddRecipe">
        <h3>Add Recipe</h3>
        <input type="text" placeholder="Recipe name" value={this.state.name} onChange={this.handNameChange}/>
        <input type="text" placeholder="enter" value={this.state.dec} onChange={this.handDecChange}/>
        <input type="submit" value="add" onClick={this.handClick}/>
      </div>
    );
  }
}

class RecipeView extends Component {
  constructor (props) {
    super(props);
  }
  handTitleChange (index, e) {
    this.props.updateTitle(e.target.value, index)
  }
  handContentChange (index, key, e) {
    this.props.updateContent(e.target.value, index, key)
  }
  handTitleShow (index, e) {
    if (e.target.firstElementChild.style.display === 'block') {
      e.target.firstElementChild.style.display = 'none'
    } else {
      e.target.firstElementChild.style.display = 'block'
    }
  }
  render () {
    const box = this.props.msg.map((item, index) => 
      <div className="box" key={index}>
        <h2 onClick={(e) => this.handTitleShow(index, e)}>{item.title}<input type="text" value={item.title} onChange={ (e) => this.handTitleChange(index, e)}/></h2>
        <ul>
          {item.content.map((value, key) => 
            <li key={key} onClick={(e) => this.handTitleShow(index, e)}>
              {value}
              <input type="text" value={value} onChange={ (e) => this.handContentChange(index, key, e)}/>
            </li>
          )}
        </ul>
      </div>
    )
    return (
      <div className="RecipeView">
        {box}
      </div>
    );
  }
} 

class RecipeBox extends Component {
  constructor (props) {
    super(props);
    this.state = {
      msg_arr: [
        {
          title: '你好',
          content: [1, 2, 3]
        },
        {
          title: 'wode',
          content: [4, 5, 6]
        }
      ]
    };
    this.handAddRecipe = this.handAddRecipe.bind(this)
    this.handUpdateTitle = this.handUpdateTitle.bind(this)
    this.handUpdateContent = this.handUpdateContent.bind(this)
  }
  handAddRecipe (item) {
    const arr = this.state.msg_arr
    arr.push(item)
    this.setState({
      msg_arr: arr
    })
  }
  handUpdateTitle (value, index) {
    const arr = this.state.msg_arr
    arr[index].title = value
    this.setState({
      msg_arr: arr
    })
  }
  handUpdateContent (value, index, key) {
    const arr = this.state.msg_arr
    arr[index].content[key] = value
    this.setState({
      msg_arr: arr
    })
  }
  render () {
    return (
      <div className="RecipeBox">
        <AddRecipe msg={this.state.msg_arr} addRecipe={this.handAddRecipe}></AddRecipe>
        <RecipeView msg={this.state.msg_arr} updateTitle={this.handUpdateTitle} updateContent={this.handUpdateContent}></RecipeView>
      </div>
    );
  }
}

export default RecipeBox;
