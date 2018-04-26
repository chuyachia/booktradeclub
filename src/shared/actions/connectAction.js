require('es6-promise').polyfill();
import axios from 'axios';
import {showAlert} from "./alertAction";

export function logIn(userinfo){
    return function(dispatch){
        dispatch({
            type:"SEND_LOG_IN"
        });
        axios.post('/auth',userinfo)
        .then(response=> {
            if(response.data.success){
                dispatch({
                    type:"LOGGED_IN",
                    payload:{
                        username:response.data.username,
                        email:response.data.email,
                        location:response.data.location,
                        books:response.data.books,
                        requests:response.data.requests
                    }
                })
                setTimeout(function() { 
                dispatch({
                    type:"REDIRECT",
                    payload:'/'
                }) 
                }, 1000)
            } else {
                dispatch({
                    type:"WRONG_CREDENTIAL",
                    payload:response.data.message
                })
            }
        })
        .catch(error=> {
            console.log(error)
            dispatch(showAlert())
        })
        
    }
}
export function cancelLogin(){
    return function(dispatch){
        dispatch({
            type:"CANCEL_LOGIN"
        })
    }
}
export function logOut(){
    return function(dispatch){
    axios.get('/logout')
    .then(response=>dispatch({
        type:"LOGGED_OUT"
    }))
    .catch(error=>{
        console.log(error);
        dispatch(showAlert())
    })
    }
}