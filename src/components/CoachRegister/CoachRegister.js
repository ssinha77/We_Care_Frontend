import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Navigation from '../Navigation/Navigation';
import {Form,Button,Col,Row} from "react-bootstrap"
import styles from './CoachRegister.module.css';
import { connect } from 'react-redux';
import { store } from '../../stores/store';
import { Navigate } from 'react-router';
import { coachRegisterAction } from '../../actions/action';

const CoachRegister = (props) => { 

  const state = store.getState();

  useEffect(() => {
    document.body.style.background = "url('/assets/Images/cloud-2725520_960_720.jpg') no-repeat center center fixed";
    document.body.style.backgroundSize = "cover";
  },[])

  const [coachCredentials,setCoachCredentials] = useState({coachName: '',
                                                           coachPassword: '',
                                                           coachDOB: new Date(),
                                                           coachGender: '',
                                                           coachPhoneNum: '',
                                                           coachSpec: ''
                                                          });

  const [coachDOBValid,setCoachDOBValid] = useState(true);
  
  const birthday = document.getElementById('coachDOB');
  
  const coachRegisterChange = (event) => {
    let tempCredentials = Object.assign({},coachCredentials,{[event.target.name]: event.target.value});
    setCoachCredentials(tempCredentials);
  }

  const coachRegisterChangeNumber = (event) => {
    try {
      let number = parseInt(event.target.value);
      let tempCredentials = Object.assign({},coachCredentials,{[event.target.name]: number});
      setCoachCredentials(tempCredentials);
    }
    catch(err) {console.log(err)}
  }

  const handleCoachRegister = (event) => {
    event.preventDefault();
    if(validateAge())
      props.register(coachCredentials);
    else
      console.log("Something isn't valid.");
  }

   function validateAge() {
    const dob = new Date(birthday.value).getFullYear();
    const now = new Date().getFullYear();
    const age = now - dob;
    console.log(age);
    if(age > 100 || age < 20) {
      setCoachDOBValid(false)
      return false;
    }
      
    else {
      setCoachDOBValid(true);
      return true;
    }
      
  }

  useEffect(() => {}, [state.user.isAuthenticated])

  return (
    <>
      {state.user.isAuthenticated ? <Navigate to = "/coachHome"/> :
        <>
          <Navigation/>
          <div className = "container p-5 mt-5 bg-dark text-white" style = {{"width": "45%", "borderRadius": "2.5%"}}>
            <img src = "assets\Images\LifeCoachLogIn.jpg"></img>
            <h1>Life Coach Profile</h1>
            <Form horizontal="true" className = "mt-3" onSubmit = {handleCoachRegister}>
              <Row>
                <Col>
                  <Form.Group className="mb-3" onChange = {coachRegisterChange}>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      name = "coachName"
                      type = "text"
                      required
                      minLength={5}
                      maxLength = {50}
                    />
                    <Form.Control.Feedback type = "invalid">Name must be between 2 and 50 characters in length</Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className = "mb-3" onChange = {coachRegisterChange}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      name = "coachPassword"
                      type = "password"
                      required
                      minLength = {5}
                      maxLength = {10}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group required className = "mb-3" onChange = {coachRegisterChange} >
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                      name = "coachDOB"
                      type="date"
                      required  
                      id = "coachDOB"
                      isInvalid = {!coachDOBValid}
                    />
                    <Form.Control.Feedback type = "invalid">Must be between ages 20-100</Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group name = "coachGender" required className = "mb-3" onChange = {coachRegisterChange}>  
                    <Form.Label>Gender</Form.Label><br/>
                    <Form.Check
                      name = "coachGender"
                      value = "M"
                      inline
                      type="radio"
                      label="Male"
                      required
                    />
                    <Form.Check
                    name = "coachGender" 
                    value = "F" 
                    inline 
                    type="radio" 
                    label="Female"
                    required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className = "mb-3" onChange = {coachRegisterChangeNumber}>
                    <Form.Label>Mobile Number (No hyphens)</Form.Label>
                    <Form.Control 
                      name = "coachPhoneNum" 
                      type = "number"
                      required
                      pattern="[0-9]{10}"
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className = "mb-3" onChange = {coachRegisterChange}>
                    <Form.Label>Speciality</Form.Label>
                    <Form.Control 
                    name = "coachSpec" 
                    type = "text"
                    required
                    minLength = {10}
                    maxLength = {50}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                  <Form.Group className = "mb-3">
                    <Button type = "submit">Register</Button>
                  </Form.Group>
                </Row>
            </Form>
          </div>
        </>
        }
    </>
  );

}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.user.isAuthenticated
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    register: (data) => dispatch (coachRegisterAction(data))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(CoachRegister);
