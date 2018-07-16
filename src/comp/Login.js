import React from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment, Checkbox} from 'semantic-ui-react'


const FormExampleForm = () => (
    <Form>
        <Form.Field>
            <label>Username</label>
            <input placeholder='Username' />
        </Form.Field>
        <Form.Field>
            <label>Password</label>
            <input type="password" placeholder='Password' />
        </Form.Field>
        <Form.Field>
            <Checkbox label='I agree to the Terms and Conditions' />
        </Form.Field>
        <Button type='submit'>Log In</Button>
        <Button type='submit'>Sign Up</Button>
    </Form>
)

export default FormExampleForm