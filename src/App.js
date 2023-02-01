import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home/Home';
import UserLogin from './components/UserLogin/UserLogin'
import UserRegister from './components/UserRegister/UserRegister'
import CoachLogin from './components/CoachLogin/CoachLogin'
import CoachRegister from './components/CoachRegister/CoachRegister'
import UserHome from './components/UserHome/UserHome'
import CoachHome from './components/CoachHome/CoachHome'
import CoachProfile from './components/CoachProfile/CoachProfile'
import UserProfile from './components/UserProfile/UserProfile'
import UserAppointments from './components/UserAppointments/UserAppointments'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = '/' element={<Home/>} />
        <Route path = "/home" element = {<Home/>}/>
        <Route path = "/userlogin" element = {<UserLogin/>}/>
        <Route path = "userregister" element = {<UserRegister/>} />
        <Route path = "/coachlogin" element = {<CoachLogin/>} />
        <Route path = "coachregister" element = {<CoachRegister/>} />
        <Route path = "/userHome" element =  {<UserHome/>}/>
        <Route path = "/coachHome" element = {<CoachHome/>}/>
        <Route path = "/coachProfile" element = {<CoachProfile/>}/>
        <Route path = "/userProfile" element = {<UserProfile/>}/>   
        <Route path = "/userAppointments" element = {<UserAppointments/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
