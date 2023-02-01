import React from 'react';
import PropTypes from 'prop-types';
import styles from './Bookings.module.css';
import { store } from '../../stores/store';

const Bookings = () => {
  
  let state = store.getState();
  let myBookings = state.user.myBookings;

  return (
    <>
    {myBookings.map((myBooking) => {
      return (
        <div className = "container p-3 mt-5 bg-dark text-white"
          style = {{"width": "20%", "borderRadius": "2.5%", "textAlign": "center"}}>
          <h1>Appointment Date</h1>
          <h2>{myBooking.appointmentDate}</h2>
          <h3>Slot: {myBooking.slot}</h3>
          <br/>
          <p>Booking Id: {myBooking.id}</p>
          <p>User Id: {myBooking.userId}</p>
        </div>
      )
    })}
    </>
)};

Bookings.propTypes = {};

Bookings.defaultProps = {};

export default Bookings;
