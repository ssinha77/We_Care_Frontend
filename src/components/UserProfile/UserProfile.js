import React from 'react';
import PropTypes from 'prop-types';
import styles from './UserProfile.module.css';
import Navigation from '../Navigation/Navigation';
import { store } from '../../stores/store';
import {Image,Row,Col} from 'react-bootstrap'

const UserProfile = () => {

  let state = store.getState();
  
  return (
    <>
    <Navigation/>
    <div className = "container p-5 mt-5 bg-dark text-white" style = {{"width": "25%", "borderRadius": "2.5%"}}>
      <Row>
        <Col>
          {state.user.gender === "M" ? 
            <Image roundedCircle src = "assets\Images\male.png"/> :
            <Image roundedCircle src = "assets/Images/female.png"/>
          }
        </Col>
        <Col>
          <h1>{state.user.username}</h1>
          <h6 className = "mt-3">Date of Birth: {state.user.dateOfBirth}</h6>
          <h6>Email: {state.user.email}</h6>
          <h6>Mobile No: {state.user.mobileNumber}</h6>
          <h6>Address: {state.user.city}, {state.user.state}, {state.user.country}</h6>
          <h6>Zipcode: {state.user.pinCode}</h6>
        </Col>
      </Row>
    </div>
  </>
)};

UserProfile.propTypes = {};

UserProfile.defaultProps = {};

export default UserProfile;
