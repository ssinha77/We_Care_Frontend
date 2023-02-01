import React from 'react';
import PropTypes from 'prop-types';
import styles from './UserAppointments.module.css';
import { store } from '../../stores/store';
import {useEffect,useState} from 'react'
import Navigation from '../Navigation/Navigation';
import { Modal,Button } from 'react-bootstrap';
import axios from 'axios';
import { Form,Image } from 'react-bootstrap';

const UserAppointments = () => {

  let state = store.getState();
  const [myBookings,setMyBookings] = useState([]);
  const [isLoading,setLoading] = useState(true);
  const [isRescheduling,setIsRescheduling] = useState(false);
  const [isCancelling,setIsCancelling] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [appDateValid,setAppDateValid] = useState(true);
  const [appDate,setAppDate] = useState(new Date());
  const [appTime,setAppTime] = useState("");
  const [rescheduleId, setRescheduleId] = useState(0);
  const [editBooking,setEditBooking] = useState({});
  //const appDate = document.getElementById("appointmentDate");

  //Set background and get current appointments.
  useEffect(() => {
    document.body.style.background = "url('/assets/Images/cloud-2725520_960_720.jpg') no-repeat center center fixed";
    document.body.style.backgroundSize = "cover";
    axios.get('http://localhost:8008/bookings')
    .then((response) => {
      let value = response.data;
      let result = value.filter(val => val.userId === state.user.id)
      if(result) {
        setMyBookings(result);
        setLoading(false);
      }
    })
  },[isLoading]);

  useEffect(() => {},[isRescheduling])


  const cancelAppointment = (appointmentId) => {
    axios.delete('http://localhost:8008/bookings/' + appointmentId)
    .then(() => {
      setIsCancelling(true);
      setShowCancelModal(false);
    });
  }

  const resetPage = () => {
    setIsCancelling(false);
    setIsRescheduling(false);
    setLoading(true);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let appointmentDate = validateAppointmentDate();
    if(appDateValid) {
      editAppointment(appointmentDate);
    }
  }

  const validateAppointmentDate = () => {
    console.log("appDate: " + appDate);
    const appDatetime = new Date(appDate);
    appDatetime.setHours(0,0,0,0);
    const now = new Date();
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    if(appDatetime - now > 600000000) {
      setAppDateValid(false);
    }
    // else if (appDatetime < now) {
    //   setAppDateValid(false);
    // }
    else {
      setAppDateValid(true);
      let appointmentDate = appDatetime.getFullYear() + "-" + (appDatetime.getMonth()+1) + "-" + (appDatetime.getDate()+1);
      return appointmentDate;
    }
  }

  const editAppointment = (appointmentDate) => {
    axios('http://localhost:8008/bookings/' + editBooking.id, {
      method: 'PUT',
      crossdomain: true,
      data: {
              "appointmentDate": appointmentDate,
              "slot": appTime,
              "coachId": editBooking.coachId,
              "userId": editBooking.userId
            },
      headers: {
        "Content-type": "application/json"
      }
    })
    .then(() => {
      resetPage();
    })
  }

  

  if(isCancelling) {
    return (
      <>
      <Navigation/>
        <div className = "container bg-dark mt-5 pt-1 text-white"
          style = {{"width": "30%", "text-align": "center", "borderRadius": "3%"}}>
          <p className = " mt-5">Your appointment was cancelled successfully.</p>
          <Button className = "my-3" onClick = {() => resetPage()}
            style = {{"width": "50%"}}>Go Back</Button>
        </div>
      </>
    )
  }
  else if(isRescheduling) {
    return (
      <>
        <Navigation/>
        <div className = "container bg-dark text-white mt-5 p-3"
          style = {{"width": "40%", "borderRadius": "2.5%"}}>
            <Image src = "assets\Images\Notepad_icon.svg.png"
              style = {{"maxWidth": "7.5%"}}
              className = "ms-5 mt-0"/>
          <h2 style = {{"display": "inline"}}
            className = "ms-5 mt-5">Reschedule your Appointment</h2>  
          <Form className = "mt-3" onSubmit = {handleSubmit}>
            <Form.Group onChange = {event => setAppDate(event.target.value)}>
              <Form.Label>Date of Appointment</Form.Label>
              <Form.Control
                name = "appointmentDate"
                required
                type = "date"
                id = "appointmentDate"
                isInvalid = {!appDateValid}
              />
              <Form.Control.Feedback type = "invalid">Must be a valid date within the next week</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className = "mt-3" onChange = {event => setAppTime(event.target.value)}>
              <Form.Label>Preferred time slot</Form.Label><br/>
              <Form.Check
                required
                inline
                type = "radio"
                label = "9 AM to 10 AM"
                value = "9 AM to 10 AM"
              />
              <Form.Check
                required
                inline
                type = "radio"
                label = "10 AM to 11 AM"
                value = "9 AM to 10 AM"
              />
              <Form.Check
                required
                inline
                type = "radio"
                label = "11 AM to 12 PM"
                value = "9 AM to 10 AM"
              />
              <Form.Check
                required
                inline
                type = "radio"
                label = "2 PM to 3 PM"
                value = "9 AM to 10 AM"
              />
              <Form.Check
                required
                inline
                type = "radio"
                label = "3 PM to 4 PM"
                value = "9 AM to 10 AM"
              />
              <Form.Check
                required
                inline
                type = "radio"
                label = "4 PM to 5 PM"
                value = "9 AM to 10 AM"
              />
            </Form.Group>
            <Button className = "mt-3 mb-5" variant = "success" type = "submit">Confirm your Appointment</Button>
          </Form>  
        </div>
      </>
    )
  }
  else if(isLoading) {
    return (
      <>
        <Navigation/>
        <div className = "container bg-dark mt-5 text-white">
          <h1>Loading...</h1>
        </div>
      </>
    )
  }
   else {
    return (
      <>
        <Navigation/>
        {myBookings.map((myBooking) => {
          return (
            <>
              <div className = "container p-3 mt-5 bg-dark text-white"
              style = {{"width": "20%", "borderRadius": "2.5%", "textAlign": "center"}}>
                <h1>Appointment Date</h1>
                <h2>{myBooking.appointmentDate}</h2>
                <h3 className = "mb-5">Slot: {myBooking.slot}</h3>
                <Button 
                  variant = "info" 
                  className = "mt-5 mb-3 text-white"
                  onClick = {() => {
                    setEditBooking(myBooking);
                    setIsRescheduling(true);
                    }}>
                  Reschedule your Appointment
                </Button>
                <Button 
                  variant = "danger" 
                  className = "mb-3" 
                  data-toggle="modal" 
                  onClick = {() => setShowCancelModal(true)}>
                  Cancel your Appointment
                </Button>
              </div>
              <Modal centered show={showCancelModal} onHide={() => setShowCancelModal(false)}>
                <Modal.Body closeButton>Are you sure you need to cancel the appointment?</Modal.Body>
                <Modal.Footer>
                  <Button onClick = {() => cancelAppointment(myBooking.id)} className = "mx-auto" style = {{"width": "40%"}} variant="success">
                    Yes
                  </Button>
                  <Button className = "mx-auto" style = {{"width": "40%"}} variant="danger" onClick={() => setShowCancelModal(false)}>
                    No
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
          )
        })}
      </>
    )
  }
};

UserAppointments.propTypes = {};

UserAppointments.defaultProps = {};

export default UserAppointments;
