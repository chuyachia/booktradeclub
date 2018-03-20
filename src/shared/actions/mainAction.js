import axios from 'axios';
import queryString from "query-string";

export function getAllBooks(){
    return function(dispatch){
        dispatch({type: "START_QUERY"});
        axios.get('/allbooks')
        .then((response)=>{
            dispatch({
                type:"NEW_QUERY",
                payload:response.data
            });
        })        
        .catch(error=> {
            dispatch({
                type:"QUERY_ERROR",
                payload:error
            });
        });
    }
}

export function logIn(userinfo){
    return function(dispatch){
        axios.post('/auth',userinfo)
        .then(response=> {
            if(response.data.success){
                dispatch({
                    type:"LOGGED_IN",
                    payload:{
                        username:response.data.username,
                        email:response.data.email,
                        books:response.data.books,
                        requests:response.data.requests
                    }
                })
            } else {
                dispatch({
                    type:"WRONG_CREDENTIAL",
                    payload:response.data.message
                })
            }
        })
        .catch(error=> {
            console.log(error)
            dispatch({
                type:"LOG_IN_ERROR"
            })
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
        dispatch({
            type:"LOG_OUT_ERROR"
        })
    })
    }
}

export function getUsersLocation(users){
    return function(dispatch){
        var query = queryString.stringify({users:users});
        axios.get('/userslocation?'+query)
        .then(response=>{
            dispatch({
                type:"GET_USERS_LOCATION",
                payload:response.data
            })
        })
        .catch(error=>console.log(error))
    }
}

export function addRequest(sender,receiver,bookid,bookname){
    return function(dispatch){
        if(!sender){
            dispatch({
                type:"LOG_IN_REQUIRED"
            })
        } else if (receiver==sender) {
            dispatch({
                type:"REQUEST_TO_SELF"
            })
        } else {
            var param = {
                action:"add",
                from:sender,
                to:receiver,
                bookid:bookid,
                bookname:bookname
            }
            axios.post('/request',param)
            .then(response=>{
                dispatch({
                    type:"NEW_REQUEST_ADDED",
                    payload:response.data.data
                })
            })
            .catch(error=>console.log(error))
        }
    }
}