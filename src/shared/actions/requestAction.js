import axios from 'axios';
import {showAlert} from "./alertAction";
import {viewBook} from "./bookAction";

export function addRequest(sender,receiver,bookid,bookname,email){
    return function(dispatch){
        if(!sender){
            dispatch({
                type:"LOG_IN_REQUIRED"
            });
        } else if (receiver==sender) {
            dispatch({
                type:"REQUEST_TO_SELF"
            });
        } else {
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
                    type:"NEW_REQUEST_ADDED",
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
                type:"SENDER_BOOKS",
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
                    type:"NEW_EXCHANGE_ADDED",
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
                type:"TRADE_CONFIRMED"
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
                type:"TRADE_DECLINED",
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
                type:"ALL_REQUESTS",
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
            type:"VIEW_REQUEST",
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
                    type:"READ_REQUEST",
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
                type:"DELETE_REQUEST",
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
