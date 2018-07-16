import React from 'react';
import ReactDOM from 'react-dom';
import Login from './comp/Login'
import Registration from './comp/Registration'
export default class App extends React.Component {
  render() {
    return (<div>
      <h2>Hello World!</h2>
        <Login />
    </div>);
  }
}
