import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './UserLogin.module.css';
import Navigation from '../Navigation/Navigation';
import {Form,Button,Col} from "react-bootstrap"
import {userLoginAction} from '../../actions/action'
import { connect } from 'react-redux';
import { useState } from 'react';
import {store} from '../../stores/store'
import { Navigate } from 'react-router';

const UserLogin = (props) => {

  useEffect(() => {
    document.body.style.background = "url('/assets/Images/cloud-2725520_960_720.jpg') no-repeat center center fixed";
    document.body.style.backgroundSize = "cover";
  },[])

  const [userCredentials,setUserCredentials] = useState({userId: 0, userPassword: 0})
  const state = store.getState();

  const userLoginChange = (event) => {
    let tempCredentials = Object.assign({},userCredentials,{[event.target.name]: event.target.value})
    setUserCredentials(tempCredentials);
    
  }

  const handleUserLogin = (event) => {
    event.preventDefault();
    props.login(userCredentials);
  }

  useEffect(() =>{},[state.user.isAuthenticated])

  return (
    <>
    {state.user.isAuthenticated ? 
      <Navigate to = "/userHome"/> :
        <>
          <Navigation/>
          <div className = "container p-5 mt-5 bg-dark text-white" style = {{"width": "30%", "borderRadius": "2.5%"}}>
            <img className = "ms-5" style = {styles.img} src = "assets\Images\UserLogIn.jpg"></img>
            <h1>Login As User</h1>
            <Form horizontal = "true" onSubmit = {handleUserLogin}>
                <Form.Group className="mb-2" onChange = {userLoginChange}>
                  <Col sm={12}>
                    <Form.Control size="lg" name = "userId" className="input-lg mt-4" type="number" placeholder="User Id" autoComplete='off' />
                  </Col>
                </Form.Group>
                <Form.Group className="mb-1" onChange = {userLoginChange}>
                  <Col sm={12}>
                    <Form.Control size="lg" name="userPassword" className="input-lg mt-4" type="password" placeholder="Password" autoComplete='off' />
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
    isAuthenticated: state.user.isAuthenticated
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (data) => dispatch(userLoginAction(data))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserLogin)
