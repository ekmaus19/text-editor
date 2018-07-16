import React, { Component } from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment, Select } from 'semantic-ui-react'

const gender = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
]

class Register extends Component {
    render() {
        return (
            <div className='register-form'>
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
                                <Form.Input fluid icon='user' iconPosition='left' placeholder='Username' />
                                <Form.Input
                                    fluid
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='Password'
                                    type='password'
                                />
                                <Form.Group widths='equal'>
                                    <Form.Input fluid placeholder='First Name'/>
                                    <Form.Input fluid placeholder='Last Name'/>
                                </Form.Group>
                                <Form.Input type='date'/>
                                <Form.Field control={Select} options={gender} placeholder='Gender' />
                                <Button color='purple' fluid size='large' onClick={this.props.toHomepage}>
                                    Register
                                </Button>
                                <Message><a href='#' onClick={this.props.toHomepage}>Cancel</a></Message>
                            </Segment>
                        </Form>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

export default Register