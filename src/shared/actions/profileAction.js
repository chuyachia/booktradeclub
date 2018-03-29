require('es6-promise').polyfill();
import axios from 'axios';
import {logIn} from "./mainAction";

export function searchBooks(bookname){
    
    return function(dispatch){
        dispatch({type: "START_SEARCH"});
        
        axios.get('/search/'+bookname)
        .then((response)=> {
            dispatch({
                type:"NEW_SEARCH",
                payload:response.data
            });
        })
        .catch(error=> {
            dispatch({
                type:"SEARCH_ERROR",
                payload:error
            });
        });
    };
  
}

export function viewBook(bookinfo,type){
    return function(dispatch){
        switch(type){
            case "addbook":
                bookinfo.btnuse = "addbook";
                dispatch({
                    type:"VIEW_ADD_BOOK",
                    payload:bookinfo
                });
                break;
            case "addrequest":
                bookinfo.btnuse = "addrequest";
                dispatch({
                    type:"VIEW_REQUEST_BOOK",
                    payload:bookinfo
                });
                break;
            case "answersender":
                bookinfo.btnuse = "answersender";
               dispatch({
                    type:"VIEW_EXCHANGE_BOOK",
                    payload:bookinfo
                });
                break;
            case "removebook":
                bookinfo.btnuse = "removebook";
                dispatch({
                    type:"VIEW_REMOVE_BOOK",
                    payload:bookinfo
                })
                break;
            default:
                bookinfo.btnuse = "info";
                dispatch({
                    type:"VIEW_BOOK",
                    payload:bookinfo
                });
                break;
        }
    };
}

export function closeBook(bookinfo){
    return function(dispatch){
        dispatch({
            type:"CLOSE_BOOK"
        });
    };
}

export function addBook(bookinfo,username){
    bookinfo.username = username;
    return function(dispatch){
        axios.post('/book',bookinfo)
        .then(response=>{
            if (response.data.success){
                dispatch({
                    type:"NEW_BOOK_ADDED",
                    payload:bookinfo
                }) 
            } else{
               dispatch({
                    type:"LOG_IN_REQUIRED"
                })  
            }
        })
        .catch(error => {
            console.log(error)
            dispatch({
            type:"ADD_BOOK_ERROR"
            })
        });
    };
}

export function removeBook(bookid,username){
        return function(dispatch){
        axios.delete('/book/'+bookid+"/"+username)
        .then(response=>{
            dispatch({
                type:"BOOK_DELETED",
                payload:bookid
            }) 
        })
        .catch(error => {
            console.log(error)
            dispatch({
            type:"DELETE_BOOK_ERROR"
            })
        });
    };
}

export function addUser(userinfo){
    return function(dispatch){
        axios.post('/newuser',userinfo)
        .then(response=> {
            if(response.data.success) {
                dispatch({
                    type:"NEW_USER_ADDED"
                })
                dispatch(logIn({
                    username:userinfo.username,
                    password:userinfo.password
                }))
                setTimeout(function() { 
                dispatch({
                    type:"REDIRECT",
                    payload:'/'
                }) 
                }, 2000)
            } else {
                dispatch({
                    type:"USERNAME_DUPLICATED"
                })
                setTimeout(function() { 
                dispatch({
                    type:"REFRESH"
                }) 
                }, 2000)
            }
        })
        .catch(error => {
            console.log(error)
            dispatch({
            type:"ADD_USER_ERROR"
            })
            setTimeout(function() { 
                dispatch({
                    type:"REFRESH"
                }) 
                }, 2000)
        });


    }
}

export function getAllRequests(username){
    return function(dispatch){
        axios.get('/request/'+username)
        .then(response=>{
            dispatch({
                type:"ALL_REQUESTS",
                payload:response.data
            })
        })
        .catch(error=>console.log(error))
    }
}

export function getSenderBooks(username){
    return function(dispatch){
        axios.get('/userbooks/'+username)
        .then(response=>{
            dispatch({
                type:"SENDER_BOOKS",
                payload:response.data
            })
        })
        .catch(error=>console.log(error))
    }
}


export function viewRequest(requestinfo,role,unread){
    return function(dispatch){
        dispatch({
            type:"VIEW_REQUEST",
            payload:requestinfo
        });
        if(unread){
            axios.post('/request',{
                tradeid:requestinfo._id,
                role:role,
                action:"read"
            })
            .then(response=>{
                dispatch({
                    type:"READ_REQUEST",
                    payload:role
                })
            })
            .catch(error=>console.log(error))  
        }
    }
}

export function addExchange(bookid,bookname,tradeid,email){
    return function(dispatch){
            var param = {
                action:"exchange",
                tradeid:tradeid,
                bookid:bookid,
                bookname:bookname,
                email:email
            }
            axios.post('/request',param)
            .then(response=>{
                dispatch({
                    type:"NEW_EXCHANGE_ADDED",
                    payload:{bookid,bookname}
                })
            })
            .catch(error=>console.log(error))
    }
}

export function confirmTrade(tradeid){
    return function(dispatch){
        axios.post('/request',{
            tradeid:tradeid,
            action:"confirm"
        })
        .then(response=>{
            dispatch({
                type:"TRADE_CONFIRMED"
            })
        })
        .catch(error=>console.log(error))  
    }
}

export function declineTrade(tradeid,to){
    return function(dispatch){
        axios.post('/request',{
            tradeid:tradeid,
            action:"decline",
            to:to
        })
        .then(response=>{
            dispatch({
                type:"TRADE_DECLINED",
                payload:to
            })
        })
        .catch(error=>console.log(error))  
    }
}

export function changePage(target){
    return function(dispatch){
        dispatch({
            type:"CHANGE_PAGE",
            payload :target
        })
    }
}

export function changeEmail(){
    return function(dispatch){
        dispatch({
            type:"CHANGE_EMAIL"
        })
    }
}

export function changeLocation(){
    return function(dispatch){
        dispatch({
            type:"CHANGE_LOCATION"
        })
    }
}

export function changePassword(){
    return function(dispatch){
        dispatch({
            type:"CHANGE_PASSWORD"
        })
    }
}


export function cancelChange(){
    return function(dispatch){
        dispatch({
            type:"CANCEL_CHANGE"
        })
    }
}

export function submitChange(username,action,data){
    return function(dispatch){
        if(action=="password"){
            data.username=username;
            axios.post('/passwordreset',data)
            .then(response=>{
                if(response.data.status=="passwordchanged"){
                   dispatch({
                       type:"PASSWORD_CHANGED"
                   })
                   setTimeout(function() { 
                    dispatch({
                        type:"SUCCESS_OFF"
                    }) 
                    }, 2000)
                } else if(response.data.status=="wrongpassword"){
                   dispatch({
                       type:"PASSWORD_MATCH_FAIL"
                   })  
                } else {
                    dispatch({
                        type:"PASSWORD_CHANGE_ERROR"
                    })
                }
                
            })
            .catch(error=>console.log(error)) 

        } else {
         axios.post('/userinfo',{
                username,data,action
            })
            .then(response=>{
                dispatch({
                    type:"USER_INFO_CHANGED",
                    payload:response.data
                })
            })
            .catch(error=>console.log(error))  
        }
    }
}

