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
            return {
                ...state,
                username:action.payload.username,
                email:action.payload.email,
                wrongcredential:false,
                error:false,
                ownedbooks:action.payload.books
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
        case "GET_ALL_REQUESTS":{
            var inrequests = action.payload.filter(request=>request.receiver.username == state.username);
            var outrequests = action.payload.filter(request=>request.sender.username == state.username);
            return{
                ...state,
                inrequests : inrequests,
                outrequests : outrequests
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