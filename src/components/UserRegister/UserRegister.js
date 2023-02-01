import React from 'react';
import PropTypes from 'prop-types';
import styles from './UserRegister.module.css';
import Navigation from '../Navigation/Navigation';
import {Form,Button,Col,Row} from "react-bootstrap"
import { useState } from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { store } from '../../stores/store';
import {userRegisterAction} from '../../actions/action'
import { Navigate } from 'react-router';

const UserRegister = (props) => { 

  const state = store.getState();

  useEffect(() => {
    document.body.style.background = "url('/assets/Images/cloud-2725520_960_720.jpg') no-repeat center center fixed";
    document.body.style.backgroundSize = "cover";
  },[])
  
  const [userCredentials,setUserCredentials] = useState({userName: '',
                                                         userPassword: '',
                                                         userPhoneNum: '',
                                                         userEmail: '',
                                                         userDOB: new Date(),
                                                         userGender: '',
                                                         userZip: 0,
                                                         userCity: '',
                                                         userState: '',
                                                         userCountry: ''
                                                        });

  const [userDOBValid,setUserDOBValid] = useState(true);
                                                        
  const birthday = document.getElementById('userDOB');

  const userRegisterChange = (event) => {
    let tempCredentials = Object.assign({},userCredentials,{[event.target.name]: event.target.value});
    setUserCredentials(tempCredentials);
  }

  const userRegisterChangeNumber = (event) => {
    try {
      let number = parseInt(event.target.value);
      let tempCredentials = Object.assign({},userCredentials,{[event.target.name]: number});
      setUserCredentials(tempCredentials);
    }
    catch(err) {console.log(err)}
    
  }

  const handleUserRegister = (event) => {
    event.preventDefault();
    if(validateAge())
      props.register(userCredentials);
    else
      console.log("The date isn't validated yet.");
    console.log(userCredentials);
  }

  function validateAge() {
    const dob = new Date(birthday.value).getFullYear();
    const now = new Date().getFullYear();
    const age = now - dob;
    console.log(age);
    if(age > 100 || age < 20) {
      setUserDOBValid(false)
      return false;
    }
      
    else {
      setUserDOBValid(true);
      return true;
    }
      
  }

  useEffect(() => {}, [state.user.isAuthenticated])

  return (
    <>
      {state.user.isAuthenticated ? <Navigate to = "/userHome"/> :
        <>
          <Navigation/>
          <div className = "container p-5 mt-5 bg-dark text-white" style = {{"width": "45%", "borderRadius": "2.5%"}}>
              <img src = "assets\Images\UserLogIn.jpg"></img>
              <h1>User Profile</h1>
              <Form horizontal="true" className = "mt-3" onSubmit = {handleUserRegister}>
                <Row>
                  <Col>
                    <Form.Group className="mb-3" onChange = {userRegisterChange}>
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        name = "userName"
                        required 
                        type = "text"
                        minLength = {2}
                        maxLength = {50}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className = "mb-3" onChange = {userRegisterChange}>
                      <Form.Label>Password</Form.Label>
                      <Form.Control 
                        name = "userPassword" 
                        required 
                        type = "password"
                        minLength = {5}
                        maxLength = {10}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group className = "mb-3" onChange = {userRegisterChangeNumber}>
                      <Form.Label>Mobile Number (No hyphens)</Form.Label>
                      <Form.Control
                        name = "userPhoneNum"
                        type = "number"
                        required
                        pattern = "[0-9]{10}"
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className = "mb-3" onChange = {userRegisterChange}>
                      <Form.Label>Email</Form.Label>
                      <Form.Control 
                        name = "userEmail"
                        type = "email"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group className = "mb-3" onChange = {userRegisterChange}>
                      <Form.Label>Date of Birth</Form.Label>
                      <Form.Control
                        name = "userDOB"
                        type = "date"
                        id = "userDOB"
                        required
                        isInvalid = {!userDOBValid}
                      />
                      <Form.Control.Feedback type = "invalid">Must be between ages 20-100</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group name = "userGender" className = "mb-3" onChange = {userRegisterChange}>
                      <Form.Label>Gender</Form.Label><br/>
                      <Form.Check 
                        required
                        name = "userGender"
                        value = "M"
                        inline 
                        type="radio" 
                        label="Male"
                      />
                      <Form.Check 
                        required 
                        name = "userGender" 
                        value = "F" 
                        inline 
                        type="radio" 
                        label="Female"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group className = "mb-3" onChange = {userRegisterChangeNumber}>
                      <Form.Label>Zip Code</Form.Label>
                      <Form.Control
                        name = "userZip"
                        type = "text"
                        required
                        minLength = {5}
                        maxLength = {5}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className = "mb-3" onChange = {userRegisterChange}>
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        name = "userCity" 
                        type = "text"
                        required
                        minLength = {6}
                        maxLength = {20}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group className = "mb-3" onChange = {userRegisterChange}>
                      <Form.Label>State</Form.Label>
                      <Form.Control 
                        name = "userState"
                        type = "text"
                        minLength = {6}
                        maxLength = {20}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className = "mb-3" onChange = {userRegisterChange}>
                      <Form.Label>Country</Form.Label>
                      <Form.Control 
                        name = "userCountry"
                        type = "text"
                        minLength = {6}
                        maxLength = {20}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                    <Form.Group className = "mb-3" onChange = {userRegisterChange}>
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
    register: (data) => dispatch(userRegisterAction(data))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserRegister);
