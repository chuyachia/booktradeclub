import {ADD_BOOK, DELETE_BOOK,START_LOGIN,SUCCESS_LOGIN,WRONG_CREDENTIAL,CANCEL_LOGIN,GET_ALL_REQUESTS,
    DELETE_REQUEST,ADD_REQUEST,SUCCESS_CHANGE_USERINFO
} from "../constants/actionTypes";

export default function reducer(state={
    wrongcredential:false,
    username:null,
    email:null,
    location:null,
    ownedbooks:[],
    inrequests:[],
    outrequests:[]
},action){
    switch(action.type) {
        case SUCCESS_LOGIN:{
            var inrequests = action.payload.requests.filter(request=>request.receiver.username == action.payload.username);
            var outrequests = action.payload.requests.filter(request=>request.sender.username == action.payload.username);
   
            return {
                ...state,
                username:action.payload.username,
                email:action.payload.email,
                location:action.payload.location,
                wrongcredential:false,
                ownedbooks:action.payload.books,
                inrequests : inrequests,
                outrequests : outrequests
            }
        }
        case GET_ALL_REQUESTS:{
            var inreqs = action.payload.filter(request=>request.receiver.username == state.username);
            var outreqs = action.payload.filter(request=>request.sender.username ==state.username);
            return {
                ...state,
                inrequests : inreqs,
                outrequests : outreqs
            }
        }
        case DELETE_REQUEST :{
            return {
                ...state,
                inrequests : state.inrequests.filter(request=>request._id !== action.payload),
                outrequests : state.outrequests.filter(request=>request._id !== action.payload)
            }            
        }
        case START_LOGIN:{
           return{
                ...state,
                wrongcredential:false
            } 
        }
        case WRONG_CREDENTIAL: {
            return{
                ...state,
                wrongcredential:true
            }
        }
        case CANCEL_LOGIN :{
            return {
                ...state,
                wrongcredential:false
            }
        }
        case ADD_BOOK:{
            return{
                ...state,
                ownedbooks:[...state.ownedbooks, action.payload]
            }
        }
        case DELETE_BOOK:{
            var newownedbooks= state.ownedbooks.filter(book=>book.bookId!=action.payload);
            return{
                ...state,
                ownedbooks:newownedbooks
            }
        }
        case ADD_REQUEST:{
            return{
            ...state,
            outrequests:[...state.outrequests,action.payload]
            }
        }
        case SUCCESS_CHANGE_USERINFO:{
            return{
                ...state,
                email:action.payload.email,
                location:action.payload.location
            }
        }

    }
    return state;
}