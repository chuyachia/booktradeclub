export default function reducer(state={
    wrongcredential:false,
    username:null,
    email:null,
    error:false,
    page:"search",
    ownedbooks:[],
    inrequests:[],
    outrequests:[]
},action){
    switch(action.type) {
        case "LOGGED_IN":{
            var inrequests = action.payload.requests.filter(request=>request.receiver.username == action.payload.username);
            var outrequests = action.payload.requests.filter(request=>request.sender.username == action.payload.username);
            return {
                ...state,
                username:action.payload.username,
                email:action.payload.email,
                wrongcredential:false,
                error:false,
                ownedbooks:action.payload.books,
                inrequests : inrequests,
                outrequests : outrequests
            }
        }
        case "WRONG_CREDENTIAL": {
            return{
                ...state,
                wrongcredential:true,
                error:false
            }
        }
        case "LOG_IN_ERROR":{
            return {
                ...state,
                error:true
            }
        }
        case "NEW_BOOK_ADDED":{
            return{
                ...state,
                ownedbooks:[...state.ownedbooks, action.payload]
            }
        }
        case "NEW_REQUEST_ADDED":{
            return{
            ...state,
            outrequests:[...state.outrequests,action.payload]
            }
        }
        case "CHANGE_PAGE":{
            return{
                ...state,
                page:action.payload
            }
        }
    }
    return state;
}