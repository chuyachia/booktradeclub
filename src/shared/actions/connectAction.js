import axios from 'axios';
import {showAlert} from "./alertAction";
import {START_LOGIN, SUCCESS_LOGIN, REDIRECT,WRONG_CREDENTIAL,CANCEL_LOGIN,LOGOUT,CONNECT_CHANGE_TAB} from "../constants/actionTypes";

export function logIn(username,password){
    return function(dispatch){
        var userinfo = {username,password};
        dispatch({
            type:START_LOGIN
        });
        axios.post('/auth/login',userinfo)
        .then(response=> {
            if(response.data.success){
                dispatch({
                    type:SUCCESS_LOGIN,
                    payload:{
                        username:response.data.username,
                        email:response.data.email,
                        location:response.data.location,
                        books:response.data.books,
                        requests:response.data.requests
                    }
                });
                setTimeout(function() { 
                dispatch({
                    type:REDIRECT
                }); 
                }, 1000);
            } else {
                dispatch({
                    type:WRONG_CREDENTIAL,
                    payload:response.data.message
                });
            }
        })
        .catch(error=> {
            console.log(error);
            dispatch(showAlert());
        });
        
    };
}
export function cancelLogin(){
    return {
        type:CANCEL_LOGIN
    };
}
export function logOut(){
    return function(dispatch){
    axios.get('/auth/logout')
    .then(response=>dispatch({
        type:LOGOUT
    }))
    .catch(error=>{
        console.log(error);
        dispatch(showAlert());
    });
    };
}

export function changePage(target){
    return {
            type:CONNECT_CHANGE_TAB,
            payload :target
    };
}