import React from 'react';
import PropTypes from 'prop-types';
import styles from './CoachHome.module.css';
import Navigation from '../Navigation/Navigation';
import { useEffect } from 'react';
import { store } from '../../stores/store';
import Bookings from '../Bookings/Bookings';

const CoachHome = () => {

  let state = store.getState();
  let myBookings = state.user.myBookings;

  useEffect(() => {
    document.body.style.background = "url('/assets/Images/cloud-2725520_960_720.jpg') no-repeat center center fixed";
    document.body.style.backgroundSize = "cover";
    
    console.log(myBookings);
  },[])

  return (
    <>
      <Navigation/> 
      {myBookings.length > 0 ? 
      <Bookings/> :
      <div className = "container p-3 mt-5"
        style = {{"width": "25%", "textAlign": "center"}}>
        <img src = "assets\Images\Notepad_icon.svg.png"/><br/>
        <h1>No currently scheduled appointments.</h1>
      </div>
      }
    </>
  );
}

export default CoachHome;
