export default function reducer(state={
    open:false,
    tologin:false,
    ownerslocation:null,
    btnuse:null,
    info:{}
},action){
    switch(action.type) {
        case "VIEW_ADD_BOOK":
        case "VIEW_REQUEST_BOOK":
        case "VIEW_EXCHANGE_BOOK":
        case "VIEW_REMOVE_BOOK":
        case "VIEW_BOOK":{
            var {btnuse, ...info} = action.payload;
            return {
                ...state,
                open:true,
                info:info,
                btnuse:btnuse
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