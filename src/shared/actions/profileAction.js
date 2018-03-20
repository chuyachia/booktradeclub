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

export function viewBook(bookinfo){
    return function(dispatch){
        dispatch({
            type:"VIEW_BOOK",
            payload:bookinfo
        });
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
                    payload:bookinfo.bookId
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


export function viewRequest(requestinfo){
    return function(dispatch){
        axios.get('/userbooks/'+requestinfo.sender.username)
        .then(response=>{
            var rtn = {};
            rtn.tradeinfo = requestinfo;
            rtn.senderbooks = response.data;
            dispatch({
                type:"VIEW_REQUEST",
                payload:rtn
            });
        })
    }
}

export function addExchange(bookid,bookname,tradeid){
    return function(dispatch){
            var param = {
                action:"exchange",
                tradeid:tradeid,
                bookid:bookid,
                bookname:bookname
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
                console.log(response.data);
                dispatch({
                    type:"TRADE_CONFIRMED"
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