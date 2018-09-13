import axios from 'axios';
import {showAlert} from "./alertAction";
import {START_GET_ALL_BOOKS, SUCCESS_GET_ALL_BOOKS, ERROR_GET_ALL_BOOKS, 
START_SEARCH_BOOK, SUCCESS_SEARCH_BOOK, ERROR_SEARCH_BOOK, VIEW_ADD_BOOK, VIEW_REQUEST_BOOK,
VIEW_EXCHANGE_BOOK,VIEW_REMOVE_BOOK,VIEW_BOOK,CLOSE_BOOK,ADD_BOOK,REQUIRE_LOGIN,
DELETE_BOOK} from "../constants/actionTypes";

export function getAllBooks(){
    return function(dispatch){
        dispatch({type: START_GET_ALL_BOOKS});
        axios.get('/books/all')
        .then((response)=>{
            dispatch({
                type:SUCCESS_GET_ALL_BOOKS,
                payload:response.data
            });
        })        
        .catch(error=> {
            console.log(error);
            dispatch({
                type:ERROR_GET_ALL_BOOKS
            });
        });
    };
}

export function searchBooks(bookname){
    return function(dispatch){
        dispatch({type: START_SEARCH_BOOK});
        axios.get('/search/'+bookname)
        .then((response)=> {
            dispatch({
                type:SUCCESS_SEARCH_BOOK,
                payload:response.data
            });
        })
        .catch(error=> {
            dispatch({
                type:ERROR_SEARCH_BOOK,
                payload:error
            });
        });
    };
  
}

export function viewBook(bookinfo,type){
        switch(type){
            case "addbook":
                bookinfo.btnuse = "addbook";
                return {
                    type:VIEW_ADD_BOOK,
                    payload:bookinfo
                };
            case "addrequest":
                bookinfo.btnuse = "addrequest";
                return {
                    type:VIEW_REQUEST_BOOK,
                    payload:bookinfo
                };
            case "answersender":
                bookinfo.btnuse = "answersender";
                return {
                    type:VIEW_EXCHANGE_BOOK,
                    payload:bookinfo
                };
            case "removebook":
                bookinfo.btnuse = "removebook";
                return {
                    type:VIEW_REMOVE_BOOK,
                    payload:bookinfo
                };
            default:
                bookinfo.btnuse = "info";
                return {
                    type:VIEW_BOOK,
                    payload:bookinfo
                };
        }
}

export function closeBook(bookinfo){
    return {
        type:CLOSE_BOOK
    };
}

export function addBook(bookinfo,username){
    bookinfo.username = username;
    return function(dispatch){
        axios.post('/books/add',bookinfo)
        .then(response=>{
            if (response.data.success){
                dispatch({
                    type:ADD_BOOK,
                    payload:bookinfo
                }); 
            } else{
               dispatch({
                    type:REQUIRE_LOGIN
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
                type:DELETE_BOOK,
                payload:bookid
            }); 
        })
        .catch(error => {
            console.log(error);
            dispatch(showAlert());
        });
    };
}