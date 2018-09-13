import axios from 'axios';
import {logIn} from "./connectAction";
import {showAlert} from "./alertAction";
import {ADD_USER,REDIRECT,DUPLICATED_USERNAME,REFRESH,GET_USERS_LOCATION,PROFILE_CHANGE_TAB,
    START_CHANGE_EMAIL,START_CHANGE_LOCATION,START_CHANGE_PASSWORD,CANCEL_CHANGE,SUCCESS_CHANGE_PASSWORD,
    REMOVE_SUCCESS_MESSAGE,FAIL_CHANGE_PASSWORD,SUCCESS_CHANGE_USERINFO
} from "../constants/actionTypes";


export function addUser(userinfo){
    return function(dispatch){
        axios.post('/users/new',userinfo)
        .then(response=> {
            if(response.data.success) {
                dispatch({
                    type:ADD_USER
                });
                dispatch(logIn(userinfo.username,userinfo.password));
                setTimeout(function() { 
                    dispatch({
                        type:REDIRECT
                    });
                }, 2000);
            } else {
                dispatch({
                    type:DUPLICATED_USERNAME
                });
                setTimeout(function() { 
                    dispatch({
                        type:REFRESH
                    });
                }, 2000);
            }
        })
        .catch(error => {
            console.log(error);
            dispatch(showAlert());
        });
    };
}

export function getUsersLocation(users){
    return function(dispatch){
       var query= users.reduce(function(acc,cur,i){
            if(i<users.length-1) {
                return acc+"users="+cur+"&";
            } else{
                return acc+"users="+cur;
            }
        },"");
        axios.get('/users/location?'+query)
        .then(response=>{
            dispatch({
                type:GET_USERS_LOCATION,
                payload:response.data
            });
        })
        .catch(error=>{
            console.log(error);
            dispatch(showAlert());
        });
    };
}

export function changePage(target){
    return {
            type:PROFILE_CHANGE_TAB,
            payload :target
    };
}

export function startChangeEmail(){
    return {
            type:START_CHANGE_EMAIL
    };
}

export function startChangeLocation(){
    return {
            type:START_CHANGE_LOCATION
    };
}

export function startChangePassword(){
    return {
            type:START_CHANGE_PASSWORD
    };
}


export function cancelChange(){
    return {
            type:CANCEL_CHANGE
    };
}

export function submitChange(username,action,data){
    return function(dispatch){
        if(action=="password"){
            data.username=username;
            axios.put('/users/changepw',data)
            .then(response=>{
                if (response.data.success){
                   dispatch({
                       type:SUCCESS_CHANGE_PASSWORD
                   });
                   setTimeout(function() { 
                    dispatch({
                        type:REMOVE_SUCCESS_MESSAGE
                    }); 
                    }, 2000);
                } else {
                    if(response.data.status=="wrongpassword"){
                       dispatch({
                           type:FAIL_CHANGE_PASSWORD
                       });
                    } else {
                        dispatch(showAlert());
                    }
                }
                
            })
            .catch(error=> {
                console.log(error);
                dispatch(showAlert());
            });

        } else {
         axios.put('/users/changeinfo',{
                username,data,action
            })
            .then(response=>{
                dispatch({
                    type:SUCCESS_CHANGE_USERINFO,
                    payload:response.data.result
                });
            })
            .catch(error=>{
                console.log(error);
                dispatch(showAlert());
            }) ; 
        }
    };
}

