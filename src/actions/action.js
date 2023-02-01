import axios from 'axios';

export function userRegisterAction(data) {
    return dispatch => {
        let newUser = { 
            "name":data.userName,
            "password": data.userPassword,
            "gender":data.userGender,
            "dateOfBirth":data.userDOB,
            "email": data.userEmail,
            "mobileNumber": data.userPhoneNum,
            "pinCode": data.userZip,
            "city": data.userCity,
            "state": data.userState,
            "country": data.userCountry
        }
        console.log("userRegisterAction newUser: ",newUser);
        axios(`http://localhost:8008/users`, {
            method: 'POST',
            crossdomain: true,
            data: newUser,
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(dispatch(getNewUserId(newUser)))
        .catch(err => console.log(err));
    }
}

export function coachRegisterAction(data) {
    return dispatch => {
        let newCoach = {
            "name": data.coachName,
            "password": data.coachPassword,
            "gender": data.coachGender,
            "dateOfBirth": data.coachDOB,
            "mobileNumber": data.coachPhoneNum,
            "speciality": data.coachSpec
        }
        console.log("coachRegisterAction newCoach: ",newCoach);
        axios(`http://localhost:8008/coaches`, {
            method: 'POST',
            crossdomain: true,
            data: newCoach,
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(dispatch(getNewCoachId(newCoach)))
        .catch(err => console.log(err));
    }
}

export function getNewCoachId(data) {
    return dispatch => {
        axios.get('http://localhost:8008/coaches')
        .then((response) => {
            let value = response.data;
            let result = value.find(val =>  val.name === data.name &&
                                            val.password === data.password)
            if(result)
                dispatch(loginMe(true,false,result.name,result.id,true,result.gender));
            else
                dispatch(loginMe(false,true));
        })
    }
}

export function getNewUserId(data) {
    return dispatch => {
        axios.get('http://localhost:8008/users')
        .then((response) => {
            let value = response.data;
            //Should be enough credentials to reliably verify the new user.
            let result = value.find(val =>  val.name === data.name &&
                                            val.password === data.password)
            if(result)
                dispatch(loginMe(true,false,result.name,result.id,false,result.gender));
            else
                dispatch(loginMe(false,true));
        })
    }
}

export function userLoginAction(data) {
    return dispatch => {
        axios.get('http://localhost:8008/users')
        .then((response) => {
            let value = response.data
            let result = value.find(val => val.id  === parseInt(data.userId) && val.password === data.userPassword)
            if(result) {   
                dispatch(loginMe(true,false,result.name,result.id,false,result.gender,
                                [],result.mobileNumber,"",result.dateOfBirth,
                                result.city,result.state,result.country,result.pincode,result.email));   
            }
                
            else {
                dispatch(loginMe(false,true));
            }
                
        });
    }
}

export function coachLoginAction(data) {
    return dispatch => {
        axios.get('http://localhost:8008/coaches')
        .then((response) => {
            console.log(data);
            let value = response.data;
            console.log(value);
            let result = value.find(val => val.id  === parseInt(data.coachId) && val.password === data.coachPassword)
            console.log(result);
            if(result) {
                axios.get('http://localhost:8008/bookings')
                .then((response) => {
                    let allBookings = response.data;
                    console.log(allBookings);
                    let myBookings = allBookings.filter(val => val.coachId === parseInt(data.coachId))
                    dispatch(loginMe(true,false,result.name,result.id,true,result.gender,myBookings,result.mobileNumber,result.speciality,result.dateOfBirth))
                })
                
            }
            else
                dispatch(loginMe(false,true));
        })
    }
}

export function loginMe(isAuthenticated,loginFailed,username,id,isCoach,gender,myBookings,mobileNumber,speciality,dateOfBirth,city,state,country,pinCode,email) {
    return {
        type: 'LOGIN',
        isAuthenticated: isAuthenticated,
        loginFailed: loginFailed,
        username: username,
        id: id,
        isCoach: isCoach,
        gender: gender,
        myBookings: myBookings,
        mobileNumber: mobileNumber,
        speciality: speciality,
        dateOfBirth: dateOfBirth,
        city: city,
        state: state,
        country: country,
        pinCode: pinCode,
        email: email
    }
}

export function logout() {
    return dispatch=> {
        dispatch(logoutMe());
    }
}

export function logoutMe() {
    return {
        type: 'LOGOUT'
    }
}