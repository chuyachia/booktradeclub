import axios from 'axios';
import {showAlert} from "./alertAction";
import {viewBook} from "./bookAction";
import {REQUIRE_LOGIN,ADD_REQUEST,GET_SENDER_BOOKS,ADD_EXCHANGE,CONFIRM_TRADE,DECLINE_TRADE,
    GET_ALL_REQUESTS,VIEW_REQUEST,SET_REQUEST_AS_READ,DELETE_REQUEST
} from "../constants/actionTypes";


export function addRequest(sender,receiver,bookid,bookname,email){
    return function(dispatch){
        if(!sender){
            dispatch({
                type:REQUIRE_LOGIN
            });
        } else if  (receiver!==sender){
            var param = {
                action:"add",
                from:sender,
                to:receiver,
                bookid:bookid,
                bookname:bookname,
                email:email
            };
            axios.post('/trades/handle',param)
            .then(response=>{
                dispatch({
                    type:ADD_REQUEST,
                    payload:response.data.data
                });
            })
            .catch(error=>{
                console.log(error);
                dispatch(showAlert());
            });
        }
    };
}

export function getSenderBooks(username){
    return function(dispatch){
        axios.get('/books/user/'+username)
        .then(response=>{
            dispatch({
                type:GET_SENDER_BOOKS,
                payload:response.data
            });
        })
        .catch(error=>{
            console.log(error);
            dispatch(showAlert());
        });
    };
}

export function addExchange(bookid,bookname,tradeid,email){
    return function(dispatch,getState){
            var param = {
                action:"exchange",
                tradeid,
                bookid,
                bookname,
                email
            };
            axios.post('/trades/handle',param)
            .then(response=>{
                dispatch({
                    type:ADD_EXCHANGE,
                    payload:{bookid,bookname}
                });
            })
            .catch(error=>{
                console.log(error);
                dispatch(showAlert());
            });
    };
}

export function confirmTrade(tradeid){
    return function(dispatch){
        axios.post('/trades/handle',{
            tradeid:tradeid,
            action:"confirm"
        })
        .then(response=>{
            dispatch({
                type:CONFIRM_TRADE
            });
        })
        .catch(error=>{
            console.log(error);
            dispatch(showAlert());
        });
    };
}

export function declineTrade(to,tradeid){
    return function(dispatch){
        axios.post('/trades/handle',{
            tradeid:tradeid,
            action:"decline",
            to:to
        })
        .then(response=>{
            dispatch({
                type:DECLINE_TRADE,
                payload:to
            });
        })
        .catch(error=>{
            console.log(error);
            dispatch(showAlert());
        });  
    };
}

export function getAllRequests(username){
    return function(dispatch){
        axios.get('/trades/'+username)
        .then(response=>{
            dispatch({
                type:GET_ALL_REQUESTS,
                payload:response.data
            });
        })
        .catch(error=>{
            console.log(error);
            dispatch(showAlert());
        });
    };
}

export function viewRequest(requestinfo,role,unread){
    return function(dispatch){
        dispatch({
            type:VIEW_REQUEST,
            payload:requestinfo
        });
        if(unread){
            axios.post('/trades/handle',{
                tradeid:requestinfo._id,
                role:role,
                action:"read"
            })
            .then(response=>{
                dispatch({
                    type:SET_REQUEST_AS_READ,
                    payload:role
                });
            })
            .catch(error=>{
                console.log(error);
                dispatch(showAlert());
            });  
        }
    };
}

export function deleteRequest(id){
    return function(dispatch){
        axios.delete('/trades/'+id)
        .then(response=>{
            dispatch({
                type:DELETE_REQUEST,
                payload:id
            });            
        })
        .catch(error=>{
            console.log(error);
            dispatch(showAlert());
        })
    }
}

export function viewBooksInfo(bookid){
    return function(dispatch){
        axios.get('/books/info/'+bookid)
        .then(response=>{
            if(response.data)
                dispatch(viewBook(response.data,"info"));
        })
        .catch(err=>{
            dispatch(showAlert());
            console.log(err);
        });        
    }
}
