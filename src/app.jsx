import React from 'react';
import {HashRouter, Route, Switch, Link, Redirect} from 'react-router-dom';
import Register from './comp/Registration.js'
import Login from './comp/Login.js'
import Dashboard from './comp/dashboard.js'
import RichEditor from './comp/textEditor.js'

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
    return (
      <HashRouter>
        <div>
           {window.location.pathname.includes('index.html') && <Redirect to="/" />}

         <Route exact path="/" component={Login} />
         <Route exact path="/register" component={Register} />
         <Route exact path="/dashboard/:id" component={Dashboard} />
         <Route exact path="/editor/" component={RichEditor} />

     </div>
   </HashRouter>

   )
  }
}
