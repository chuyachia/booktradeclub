import axios from 'axios';
import {showAlert} from "./alertAction";

export function getAllBooks(){
    return function(dispatch){
        dispatch({type: "START_QUERY"});
        axios.get('/books/all')
        .then((response)=>{
            dispatch({
                type:"NEW_QUERY",
                payload:response.data
            });
        })        
        .catch(error=> {
            console.log(error);
            dispatch({
                type:"QUERY_ERROR"
            });
        });
    };
}

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
                });
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
        axios.post('/books/add',bookinfo)
        .then(response=>{
            if (response.data.success){
                dispatch({
                    type:"NEW_BOOK_ADDED",
                    payload:bookinfo
                }); 
            } else{
               dispatch({
                    type:"LOG_IN_REQUIRED"
                });  
            }
        })
        .catch(error => {
            console.log(error);
            dispatch(showAlert());
        });
    };
}

export function removeBook(bookid,username){
        return function(dispatch){
        axios.delete('/books/remove/'+bookid+"/"+username)
        .then(response=>{
            dispatch({
                type:"BOOK_DELETED",
                payload:bookid
            }); 
        })
        .catch(error => {
            console.log(error);
            dispatch(showAlert());
        });
    };
}