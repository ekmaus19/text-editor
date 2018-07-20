import React, { Component } from 'react';
import {HashRouter, Route, Switch, Link, Redirect} from 'react-router-dom';
import { Button, Form, Grid, Header, Image, Message, Segment, Select } from 'semantic-ui-react'
import './Login';

const url = "http://127.0.0.1:1337"

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  onSubmit() {
    const _this = this
    fetch(url + '/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
    })
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((responseJson) => {
      console.log(responseJson);
      if (responseJson.success) {
        _this.context.history.push('/login');
      }
      return responseJson;
    })
    .catch((err) => {
      throw err;
    });
  }


  render() {
    return (
      <div className="register-form">
        {/*
          Heads up! The styles below are necessary for the correct render of this example.
          You can do same with CSS, the main idea is that all the elements up to the `Grid`
          below must have a height of 100%.
          */}
          <style>{`
            body > div,
            body > div > div,
            body > div > div > div.register-form {
              height: 100%;
            }
            `}</style>
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
              <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='purple' textAlign='center'>
                  New User
                </Header>
                <Form size='large'>
                  <Segment stacked>
                    <Form.Input fluid icon='user' onChange={(e)=>this.setState({username:e.target.value})} iconPosition='left' placeholder='Username' />
                    <Form.Input
                      fluid
                      icon='lock'
                      iconPosition='left'
                      placeholder='Password'
                      type='password'
                      onChange={(e)=>this.setState({password:e.target.value})}
                    />
                    {/* <Link to={{ pathname: '/login' }}> */}
                    <Button color='purple' fluid size='large' onClick={() => this.onSubmit()}>
                      Register
                    </Button>
                  {/* </Link> */}
                  </Segment>
                </Form>
              </Grid.Column>
            </Grid>
          </div>
        )
      }
    }

export default Register
