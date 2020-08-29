import React from 'react';
import {Navbar, Nav, Button, Form} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {PUBLIC_URL} from '../config';

export default function AdminNav(props) {

  return (
    <Navbar className="admin-nav" expand="lg">
      <Link to="/"><img src={`${PUBLIC_URL}/white-logo.png`} style={{width: '150px'}} alt="logo"/></Link>
      {/* {
        !props.adminUser ? (<></>) : ( */}
        <>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto" >
              {/* Links only for coding-purposes */}
              <Link to="/admin"><Nav.Link style={{color: 'white', fontWeight: '600', marginLeft: '20px'}} disabled>Edit items</Nav.Link></Link>
              <Link to="/admin/sign-in"><Nav.Link style={{color: 'white', fontWeight: '600'}} disabled>Sign In</Nav.Link></Link>
              <Link to="/admin/delivery"><Nav.Link style={{color: 'white', fontWeight: '600'}} disabled>Delivery</Nav.Link></Link>
              </Nav>
              <Nav>
                <Button className="admin-nav-btn" style={{fontWeight: '600'}} onClick={props.onAdminLogOut}>Log Out</Button>
              </Nav> 
          </Navbar.Collapse>
        </>
        {/* )
      } */}
    </Navbar>
  )
}
