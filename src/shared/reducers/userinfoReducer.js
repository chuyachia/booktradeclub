export default function reducer(state={
    wrongcredential:false,
    username:null,
    email:null,
    location:null,
    ownedbooks:[],
    inrequests:[],
    outrequests:[],
    redirect:null
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
        case "SEND_LOG_IN":{
           return{
                ...state,
                wrongcredential:false
            } 
        }
        case "WRONG_CREDENTIAL": {
            return{
                ...state,
                wrongcredential:true
            }
        }
        case "CANCEL_LOGIN" :{
            return {
                ...state,
                wrongcredential:false
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
        case "REDIRECT":{
            return{
                ...state,
                redirect:action.payload
            }
        }
    }
    return state;
}