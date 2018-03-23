export default function reducer(state={
    open:false,
    tologin:false,
    ownerslocation:null,
    btnuse:null,
    info:{}
},action){
    switch(action.type) {
        case "VIEW_ADD_BOOK":{
            return {
                ...state,
                open:true,
                info:action.payload,
                btnuse:"addbook"
            };
        }
        case "VIEW_REQUEST_BOOK":{
            return {
                ...state,
                open:true,
                add:false,
                info:action.payload,
                btnuse:"addrequest"
            };
        }
        case "VIEW_EXCHANGE_BOOK":{
            return {
                ...state,
                open:true,
                add:false,
                info:action.payload,
                btnuse:"answersender"
            };
        }
        case "VIEW_REMOVE_BOOK":{
            return {
                ...state,
                open:true,
                add:false,
                info:action.payload,
                btnuse:"removebook"
            };
        }
        case "VIEW_BOOK":{
            return {
                ...state,
                open:true,
                add:false,
                info:action.payload,
                btnuse:null
            };
        }
        case "BOOK_DELETED":
        case "CLOSE_BOOK":{
            return {
                ...state,
                open:false
            };
        }
        case "LOG_IN_REQUIRED":{
            return {
                ...state,
                tologin:true
            }
        }
        case "LOGGED_IN":{
            return {
                ...state,
                tologin:false
            }
        }
        case "GET_USERS_LOCATION":{
            return{
                ...state,
                ownerslocation :action.payload
            }
        }
        case "NEW_EXCHANGE_ADDED":{
            return{
                ...state,
                open:false
            }
        }

    }
    return state;
}