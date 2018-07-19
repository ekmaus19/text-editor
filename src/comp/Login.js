import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import './Registration';

const url = 'http://134f1802.ngrok.io';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            userId: '',
        };
    }

    onSubmit() {
      var _this = this
      fetch(url + '/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
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
          _this.props.history.push('/dashboard/' + responseJson.user._id)
        }
        return responseJson;
      })
      .catch((err) => {
        throw err;
      });
    }

    render() {
        return (
            <div className='login-form'>
                {/*
          Heads up! The styles below are necessary for the correct render of this example.
          You can do same with CSS, the main idea is that all the elements up to the `Grid`
          below must have a height of 100%.
        */}
                <style>{`
          body > div,
          body > div > div,
          body > div > div > div.login-form {
            height: 100%;
          }
        `}</style>
                <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as='h2' color='purple' textAlign='center'>
                            Log In
                        </Header>
                        <Form size='large'>
                            <Segment stacked>
                                <Form.Input
                                  fluid
                                  icon='user'
                                  iconPosition='left'
                                  placeholder='Username'
                                  onChange={(e)=>this.setState({username:e.target.value})}/>
                                <Form.Input
                                    fluid
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='Password'
                                    type='password'
                                    onChange={(e)=>this.setState({password:e.target.value})}
                                />

                                {/* <Link to={'/dashboard/' + this.state.userId}> */}
                                <Button color='purple' fluid size='large' onClick={() => this.onSubmit()}>
                                    Login
                                </Button>
                              {/* </Link> */}
                            </Segment>
                        </Form>
                        <Message>
                            New user? <Link to={{ pathname: '/register' }}>Sign Up</Link>
                        </Message>
                        <Message><a href='#'>Cancel</a></Message>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

export default Login
