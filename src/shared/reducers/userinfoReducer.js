export default function reducer(state={
    wrongcredential:false,
    username:null,
    email:null,
    location:null,
    error:false,
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
                location:action.payload.location,
                wrongcredential:false,
                error:false,
                ownedbooks:action.payload.books,
                inrequests : inrequests,
                outrequests : outrequests
            }
        }
        case "ALL_REQUESTS":{
            var inreqs = action.payload.filter(request=>request.receiver.username == state.username);
            var outreqs = action.payload.filter(request=>request.sender.username ==state.username);
            return {
                ...state,
                inrequests : inreqs,
                outrequests : outreqs
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
        case "BOOK_DELETED":{
            var newownedbooks= state.ownedbooks.filter(book=>book.bookId!=action.payload);
            return{
                ...state,
                ownedbooks:newownedbooks
            }
        }
        case "NEW_REQUEST_ADDED":{
            return{
            ...state,
            outrequests:[...state.outrequests,action.payload]
            }
        }
        case "USER_INFO_CHANGED":{
            return{
                ...state,
                email:action.payload.email,
                location:action.payload.location
            }
        }
    }
    return state;
}