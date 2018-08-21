import axios from 'axios';
import {logIn} from "./connectAction";
import {showAlert} from "./alertAction";

export function addUser(userinfo){
    return function(dispatch){
        axios.post('/users/new',userinfo)
        .then(response=> {
            if(response.data.success) {
                dispatch({
                    type:"NEW_USER_ADDED"
                });
                dispatch(logIn({
                    username:userinfo.username,
                    password:userinfo.password
                }));
                setTimeout(function() { 
                dispatch({
                    type:"REDIRECT"
                });
                }, 2000);
            } else {
                dispatch({
                    type:"USERNAME_DUPLICATED"
                });
                setTimeout(function() { 
                dispatch({
                    type:"REFRESH"
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
                type:"GET_USERS_LOCATION",
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
            type:"CHANGE_PAGE",
            payload :target
    };
}

export function changeEmail(){
    return {
            type:"CHANGE_EMAIL"
    };
}

export function changeLocation(){
    return {
            type:"CHANGE_LOCATION"
    };
}

export function changePassword(){
    return {
            type:"CHANGE_PASSWORD"
    };
}


export function cancelChange(){
    return {
            type:"CANCEL_CHANGE"
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
                       type:"PASSWORD_CHANGED"
                   });
                   setTimeout(function() { 
                    dispatch({
                        type:"SUCCESS_OFF"
                    }); 
                    }, 2000);
                } else {
                    if(response.data.status=="wrongpassword"){
                       dispatch({
                           type:"PASSWORD_MATCH_FAIL"
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
                    type:"USER_INFO_CHANGED",
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

