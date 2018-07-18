import React from 'react';
import Dashboard from './dashboard.js'
import RichEditor from './textEditor.js'
import { Button, Header, Image, Modal } from 'semantic-ui-react'

export default class App extends React.Component {
  render() {
    return (
    <div>
      <RichEditor />
    </div>);
  }
}
