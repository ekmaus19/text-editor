import React from 'react';
import Register from './comp/Registration.js'
import Login from './comp/Login.js'
import Dashboard from './comp/dashboard.js'

// import RichEditor from './textEditor.js'

export default class App extends React.Component {

  // componentDidMount() {
  //     fetch('/current_user', {
  //       method: 'GET',
  //     }).then(res => res.json())
  //     .then(json => {
  //       console.log(json)
  //       this.setState({
  //         user: req.user
  //       })
  //     })
  //     .catch((err) => {
  //       throw err
  //     })
  //   }

  render() {
    return (<div>
      <dashboard />
      <div>wow look at me</div>
    </div>);
  }
}
