import React from 'react'
import {Form, Button} from 'react-bootstrap'
import {Link, Redirect} from 'react-router-dom'
import {PUBLIC_URL} from '../config'
import Navbar from './Navbar';

export default function SignUp(props) {

  if (props.toHome){
    return <Redirect to='/home' /> 
  }

  return (
    <>
    <Navbar loggedInUser={props.loggedInUser}/>
    <div className="signup" >
    <p style={{textAlign: 'center', padding: '30px', marginLeft:'5%', marginRight:'5%',color: '#036C9C', fontWeight:'600', fontSize: '25px'}}><em>Plaundry helps you to keep your clothes clean and ready to be used</em></p>
    <Form noValidate className="admin-signinform" onSubmit={props.onSignUp}>
      <Form.Group style={{width:'50%'}} controlId="formBasicEmail">
        <Form.Label style={{color: '#036C9C', fontWeight:'600'}}>Username</Form.Label>
        <Form.Control name="username" type="text" placeholder="Enter username" />
        <Form.Text className="text-muted">
          Share us your nick name
        </Form.Text>
      </Form.Group>
      <Form.Group style={{width:'50%'}} controlId="formBasicEmail">
        <Form.Label style={{color: '#036C9C', fontWeight:'600'}}>Email address</Form.Label>
        <Form.Control  name="email" type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group style={{width:'50%'}} controlId="formBasicPassword">
        <Form.Label style={{color: '#036C9C', fontWeight:'600'}}>Password</Form.Label>
        <Form.Control name="password" type="password" placeholder="Password" />
        <Form.Text className="text-muted">
          Password needs to have a number, a character, a lowercase and uppercase letter and needs to have at least 8 characters.
        </Form.Text>
      </Form.Group>
      {
        props.err ? <p style={{color: '#036C9C'}}>{props.errorMessage}</p> : <></>
      }
      <Button style={{fontSize: '20px'}} className="general-btn" variant="primary" type="submit">
        Sign Up
      </Button>
    </Form>
    <p style={{textAlign: 'center', color: '#036C9C'}}>Already registered?</p>
    <Link to="/sign-in" style={{display: 'flex', justifyContent: 'center', fontWeight: '600', textDecoration:'underline', color: '#036C9C'}}>Sign In</Link>
    <p style={{textAlign: 'center', color: '#036C9C', fontWeight:'600', fontSize: '16px', margin: '0% 18%', paddingTop: '20px', paddingBottom: '50px'}}>Do you have any question or need some support?
    <br></br>
    Reach out to us by <a href="mailto:info@plaundry.com"><img style={{width: '20px'}} src={`${PUBLIC_URL}/email-blue.png`} alt="email" /></a></p>
  </div>
  </>
  )
}
