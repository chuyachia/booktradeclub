export default function reducer(state={
    open:false,
    tologin:false,
    ownerslocation:null,
    info:{}
},action){
    switch(action.type) {
        case "VIEW_BOOK":{
            return {
                ...state,
                open:true,
                add:false,
                info:action.payload
            };
        }
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