import React from 'react';
import PropTypes from 'prop-types';
import styles from './UserHome.module.css';
import Navigation from '../Navigation/Navigation';
import { useEffect,useState } from 'react';
import axios from 'axios';
import { Form,Button,Image,Row,Col } from 'react-bootstrap';
import { store } from '../../stores/store';

const UserHome = () => {

  let state = store.getState();
  const [isLoading,setLoading] = useState(true);
  const [coaches,setCoaches] = useState([]);
  const [coachId,setcoachId] = useState(0);
  const [coachChosen,setCoachChosen] = useState(false);
  const [appDateValid,setAppDateValid] = useState(true);
  const [appTime,setAppTime] = useState("");
  const [appointmentSet,setAppointmentSet] = useState(false);
  const appDate = document.getElementById("appointmentDate");
  

  useEffect(() => {
    document.body.style.background = "url('/assets/Images/cloud-2725520_960_720.jpg') no-repeat center center fixed";
    document.body.style.backgroundSize = "cover";
    axios.get('http://localhost:8008/coaches')
    .then((response) => {
      setCoaches(response.data);
      setLoading(false);
    })
  },[]);

  useEffect(() => {},[coachId,coachChosen]);

  const getAppointment = (id) => {
    setCoachChosen(true);
    setcoachId(id);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let appointmentDate = validateAppointmentDate();
    if(appDateValid) 
      postAppointment(appointmentDate,coachId);
  }

  const validateAppointmentDate = () => {
    const appDatetime = new Date(appDate.value);
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

  const postAppointment = (appointmentDate,coachId) => {
    let newAppointment = {
      "appointmentDate": appointmentDate,
      "coachId": coachId,
      "userId": state.user.id,
      "slot": appTime
    }
    console.log(newAppointment);
    axios('http://localhost:8008/bookings', {
      method: 'POST',
      crossdomain: true,
      data: newAppointment,
      headers: {
        "Content-type": "application/json"
      }
    })
    .then(setAppointmentSet(true))
    .catch(err => console.log(err));
  }

  const resetPage = () => {
    setAppointmentSet(false);
    setCoachChosen(false);
  } 

  if(isLoading) {
    return <div className = "container">Loading....</div>
  }

  if(appointmentSet) {
    return( 
      <>
      <Navigation/>
      <div className = "container bg-dark mt-5  pt-1 text-white"
        style = {{"width": "30%", "text-align": "center", "borderRadius": "3%"}}>
        <h5 className = "mt-5">Your appointment is scheduled!</h5>
        <h6>View your appointments under My Appointments</h6>
        <Button className = "my-3"
          onClick = {resetPage}
          style = {{"width": "50%"}}>Go Back</Button>
      </div>
    </>
    )
  }

  if(coachChosen) {
    return (
      <>
        <Navigation/>
        <div className = "container bg-dark text-white mt-5 p-3"
          style = {{"width": "40%", "borderRadius": "2.5%"}}>
            <Image src = "assets\Images\Notepad_icon.svg.png"
              style = {{"maxWidth": "7.5%"}}
              className = "ms-5 mt-0"/>
          <h2 style = {{"display": "inline"}}
            className = "ms-5 mt-5">Proceed with your Appointment</h2>  
          <Form className = "mt-3" onSubmit = {handleSubmit}>
            <Form.Group>
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

  return (
    <>
      <Navigation/>
      <div className = "d-flex justify-content-center m-auto flex-wrap"
            style = {{"width": "80%"}}>
        {coaches.map((coach) => {
          return (
            <div className = "flex-fill p-3 mx-4 my-4 bg-light"
              style = {{"width": "30.75%", "maxWidth": "30.75%", "borderRadius": "3%"}}>
                <Row>
                  <Col>
                    {coach.gender === "M" ? 
                      <Image className = "my-3 ms-3" roundedCircle src = "assets\Images\male.png"/> :
                      <Image className = "my-3 ms-3" roundedCircle src = "assets/Images/female.png"/> 
                    }
                  </Col>
                  <Col className = "me-5">
                    <h2>{coach.name}</h2>
                    <h3>Coach Id: {coach.id}</h3>
                    <p>Mobile Number: {coach.mobileNumber}</p>
                    <p>Speciality: {coach.speciality}</p>
                    <Button onClick={ () => getAppointment(coach.id)}>Book an Appointment</Button>
                  </Col>
                </Row>
            </div>
          )
        })}
      </div>
      
    </>
  );
  
}

UserHome.propTypes = {};

UserHome.defaultProps = {};

export default UserHome;
