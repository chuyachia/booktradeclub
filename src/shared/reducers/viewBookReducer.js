export default function reducer(state={
    open:false,
    tologin:false,
    ownerslocation:[],
    btnuse:null,
    info:{
        authors:[],
        bookId:"",
        categories:[],
        description:"",
        imageUrl:"",
        ownBy:[],
        publishedDate:"",
        publisher:"",
        title:""
    }
},action){
    switch(action.type) {
        case "VIEW_ADD_BOOK":
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
        case "VIEW_REQUEST_BOOK":{
            var {btnuse,ownBy, ...info} = action.payload;
            ownBy.sort();
            info.ownBy =ownBy;
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
                open:false,
                ownerslocation:[]
            };
        }
        case "LOG_IN_REQUIRED":{
            return {
                ...state,
                tologin:true
            }
        }
        case "CANCEL_LOGIN":
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