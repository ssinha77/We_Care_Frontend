import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './CoachLogin.module.css';
import Container from 'react-bootstrap/esm/Container';
import Navigation from '../Navigation/Navigation';
import {Form,Button,Col} from "react-bootstrap"
import { useState } from 'react';
import { store } from '../../stores/store';
import { connect } from 'react-redux/es/exports';
import { Navigate } from 'react-router';
import { coachLoginAction } from '../../actions/action';

const CoachLogin = (props) => {

  useEffect(() => {
    document.body.style.background = "url('/assets/Images/cloud-2725520_960_720.jpg') no-repeat center center fixed";
    document.body.style.backgroundSize = "cover";
  },[])

  const [coachCredentials,setCoachCredentials] = useState({coachId: 0, coachPassword: ''})
  const state = store.getState();

  const coachLoginChange = (event) => {
    let tempCredentials = Object.assign({},coachCredentials,{[event.target.name]: event.target.value});
    setCoachCredentials(tempCredentials);
  }

  const handleCoachLogin = (event) => {
    event.preventDefault();
    props.login(coachCredentials);
  }

  useEffect(() => {}, [state.user.isAuthenticated]);

  return (
    <>
      {state.user.isAuthenticated ? 
        <Navigate to = "/coachHome"/> :
        <>
          <Navigation/>
          <div className = "container p-3 mt-5 bg-dark text-white" style = {{"width": "30%", "borderRadius": "2.5%"}}>
            <img className = "ms-5" style = {styles.img} src = "assets\Images\LifeCoachLogIn.jpg"></img>
            <h1 style = {styles.h3}>Login As Life Coach</h1>
            <Form horizontal = "true" onSubmit = {handleCoachLogin}>
              <Form.Group className="mb-2" onChange = {coachLoginChange}>
                <Col sm={12}>
                  <Form.Control size="lg" name = "coachId" className="input-lg mt-4" type="text" placeholder="Coach Id" autoComplete='off' />
                </Col>
              </Form.Group>
              <Form.Group className="mb-1" onChange = {coachLoginChange}>
                <Col sm={12}>
                  <Form.Control size="lg" name="coachPassword" className="input-lg mt-4" type="password" placeholder="Password" autoComplete='off' />
                </Col>
              </Form.Group>
              {state.user.loginFailed ? <h4 className = "mt-4" style = {{'color': 'red','textAlign': 'center'}}>Invalid credentials</h4> : null}
              <Form.Group className = "mb-2"> 
                <Col sm = {12}>
                  <Button style = {styles.Button} size= "lg" className="mt-4" variant="primary" type="submit">Sign in</Button>
                </Col>
              </Form.Group>
            </Form>
          </div>
          
        </>
      }
    </>
  );

}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.user.isAuthenticated,
    loginFailed: state.user.loginFailed
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (data) => dispatch(coachLoginAction(data))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(CoachLogin);
