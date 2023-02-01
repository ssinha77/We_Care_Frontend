import React from 'react';
import PropTypes from 'prop-types';
import { Navbar,Nav,NavDropdown,Container } from 'react-bootstrap';
import { IconContext } from 'react-icons';
import {BsTelephoneFill} from "react-icons/bs"
import { useEffect } from 'react';
import { store } from '../../stores/store';
import {NavLink} from 'react-router-dom'
import './Navigation.css';

const Navigation = () => {
  
  const state = store.getState();
  
  return  (
    <Navbar bg="dark" expand="lg" variant="dark">
    <Container fluid>
      <Navbar.Brand href="#home">WeCare</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className = "justify-content-end">
        <Nav>
          {state.user.isAuthenticated ?
            <>
              <Nav.Link href = "/home" className = "me-3 text-white">Logout</Nav.Link>
              {state.user.isCoach ? null : <NavLink to = "/userHome" className = " mt-2 me-3 text-white navlink">Home</NavLink>}
              <NavLink to = {state.user.isCoach ? "/coachProfile" : "/userProfile"}  className = " mt-2 me-3 text-white navlink">My Profile</NavLink>
              <NavLink to = {state.user.isCoach ? "/coachHome" : "/userAppointments"}  className = "mt-2 me-3 text-white navlink">My Appointments</NavLink>
            </> :
            <Nav.Link href = "/" className = "me-3 text-white">Login</Nav.Link>
          }
          <IconContext.Provider value={{ color: "white"}}>
            <Navbar.Brand >
              <BsTelephoneFill/>
              Call Us: +1 (504)-123-4567
            </Navbar.Brand>
          </IconContext.Provider>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
}

Navigation.propTypes = {};

Navigation.defaultProps = {};

export default Navigation;
