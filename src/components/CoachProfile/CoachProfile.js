import React from 'react';
import PropTypes from 'prop-types';
import styles from './CoachProfile.module.css';
import { store } from '../../stores/store';
import Navigation from '../Navigation/Navigation';
import {Image,Row,Col} from "react-bootstrap"
const CoachProfile = () => {
  
  let state = store.getState();

  return (
    <>
    <Navigation/>
      <div className = "container p-5 mt-5 bg-dark text-white" style = {{"width": "30%", "borderRadius": "2.5%"}}>
        <Row>
          <Col>
          {state.user.gender === "M" ? 
            <Image roundedCircle src = "assets\Images\male.png" /> :
            <Image roundedCircle src = "assets\Images\female.png" />
          }
          </Col>
          <Col>
            <h4>Coach Id: {state.user.id}</h4>
            <h6>Date of Birth: {state.user.dateOfBirth}</h6>
            <h6>Mobile No: {state.user.mobileNumber}</h6>
            <h6>Speciality: {state.user.speciality}</h6>
          </Col>
        </Row>
      </div>
    </>
  )
};

CoachProfile.propTypes = {};

CoachProfile.defaultProps = {};

export default CoachProfile;
