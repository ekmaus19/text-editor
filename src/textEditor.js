import React, { Component } from 'react';
import {Editor, EditorState, RichUtils, Modifier} from 'draft-js'
// import { Button } from 'react-bootstrap'
import ColorPicker, {colorPickerPlugin} from 'draft-js-color-picker'
import createStyles from 'draft-js-custom-styles'
import { Button, Icon, Header } from 'semantic-ui-react'
// import '../Editor.css';
const customStyleMap = {
  remoteCursor: {
    borderLeft: 'solid 3px red'
  }
}

const {styles, customStyleFn} = createStyles(["font-size"], customStyleMap)

let alignmentBar = [
  {style:'align-left', label:'Left'},
  {style:'align-center', label:'Center'},
  {style:'align-right', label:'Right'},
]

function isBlockStyle(style) {
  if (style.indexOf('align-') === 0) return true
  return false
}

function getBlockStyle(block) {
  const type = block.getType()
  return isBlockStyle(type) ? type : null
}

const presetColors = [
  '#ff00aa',
  '#F5A623',
  '#F8E71C',
  '#8B572A',
  '#7ED321',
  '#417505',
  '#BD10E0',
  '#9013FE',
  '#4A90E2',
  '#50E3C2',
  '#B8E986',
  '#000000',
  '#4A4A4A',
  '#9B9B9B',
  '#FFFFFF',
];
let styleMap = {}

class RichEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editorState: EditorState.createEmpty(),
      fontInput: null
    };
    this.updateEditorState = editorState => this.setState({editorState});
    this.getEditorState = () => this.state.editorState;
    this.onChange = (editorState) => this.setState({editorState});
    this.handleKeyCommand = (command) => this._handleKeyCommand(command);
    this.onTab = (e) => this._onTab(e);
    this.picker = colorPickerPlugin(this.updateEditorState, this.getEditorState);
  }

  _handleKeyCommand(command) {
    const {editorState} = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false
  }
  _onTab(e) {
    const maxDepth = 4;
    this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
  }
  _onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState,
      "BOLD"
    ));
  }
  _onItalicizeClick() {
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState,
      "ITALIC"
    ));
  }
  _onUnderlineClick() {
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState,
      "UNDERLINE"
    ));
  }

  ////////////////////////////////////
  toggleBulletPoints() {
    this.onChange(RichUtils.toggleBlockType(
        this.state.editorState,
        'unordered-list-item'
      )
    )
  }

  toggleNumberedList() {
    this.onChange(RichUtils.toggleBlockType(
        this.state.editorState,
        'ordered-list-item'
      )
    )
  }
  //////////////////////////////////////
  onToggleStyle(e, style) {
    // e.preventDefault()
    const toggleFn = isBlockStyle(style) ? RichUtils.toggleBlockType : RichUtils.toggleInlineStyle
    this.onChange(toggleFn(this.state.editorState, style))
  }

  onSetStyle(e, name, val){
    // e.preventDefault()
    this.onChange(styles[name].toggle(this.state.editorState, val))
  }

  toggleFont(e, blockType){
    // e.preventDefault();
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType))
  }

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <div id="content" className="container">

          <h2 className="ui header">
            <Icon className="file outline" />
            <div className="content">
              Document Title:
              <div className="sub header">Shareable Document ID:</div>
            </div>
          </h2>

          <div className='ui menu'>

            <a className='item'>
              {/* <Button.Group> */}
                {/* <Button icon className='mini ui button'><Icon className='eye dropper'/></Button> */}
                {/* <Button className='tiny ui button'> */}
                  <ColorPicker
                    toggleColor={color => this.picker.addColor(color)}
                    presetColors = {presetColors}
                    color={this.picker.currentColor(editorState)}
                  />
                {/* </Button> */}
              {/* </Button.Group> */}
            </a>

              <a className='item'>
                <Button.Group className="compact">
                  <Button icon onClick={this._onBoldClick.bind(this)}><Icon className='bold'/></Button>
                  <Button icon onClick={this._onUnderlineClick.bind(this)}><Icon className='underline'/></Button>
                  <Button icon onClick={this._onItalicizeClick.bind(this)}><Icon className='italic'/></Button>
                </Button.Group>
              </a>

              <a className='item'>
                <Button.Group >
                  <Button icon onClick={this.onToggleStyle("align-right")}><Icon className='align right'/></Button>
                  <Button icon onClick={this.onToggleStyle("align-center")}><Icon className='align center'/></Button>
                  <Button icon onClick={this.onToggleStyle("align-left")}><Icon className='align left'/></Button>
                </Button.Group>
              </a>

              <a className='item'>
                <Button.Group >
                  <Button icon onClick={this.toggleNumberedList.bind(this)}><Icon className='list ol'/></Button>
                  <Button icon onClick={this.toggleBulletPoints.bind(this)}><Icon className='list ul'/></Button>
                </Button.Group>
              </a>

              <a className='item'>
                <button onMouseDown= {(e)=>this.toggleFont(e, 'header-six')}>12</button>
                <button onMouseDown= {(e)=>this.toggleFont(e, 'header-two')}>24</button>
                <button onMouseDown= {(e)=>this.toggleFont(e, 'header-one')}>32</button>
              </a>



          {/* <div className='right menu'>
            <a className='item'>
              <Button className='ui button'>
                Save Changes
              </Button>
            </a>
          </div> */}

          </div>

          <div id="editor" ref='editor'>
            <Editor
              editorState={this.state.editorState}
              customStyleFn={customStyleFn}
              customStyleMap={customStyleMap}
              blockStyleFn={getBlockStyle}
              onChange={this.onChange}
              spellCheck={true}
              handleKeyCommand={this.handleKeyCommand}
            />
          </div>

        <Button className='backButton'>Save Changes</Button>
        <Button className="backButton">Back</Button>
      </div>
    </div>);
  }
}
export default RichEditor;
