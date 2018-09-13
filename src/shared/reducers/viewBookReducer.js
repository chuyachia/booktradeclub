import {VIEW_ADD_BOOK, VIEW_REQUEST_BOOK,VIEW_EXCHANGE_BOOK,VIEW_REMOVE_BOOK,GET_USERS_LOCATION,
VIEW_BOOK,CLOSE_BOOK,DELETE_BOOK,REQUIRE_LOGIN,SUCCESS_LOGIN,CANCEL_LOGIN,ADD_EXCHANGE} from "../constants/actionTypes";

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
        case VIEW_ADD_BOOK:
        case VIEW_EXCHANGE_BOOK:
        case VIEW_REMOVE_BOOK:
        case VIEW_BOOK:{
            var {btnuse, ...info} = action.payload;
            return {
                ...state,
                open:true,
                info:info,
                btnuse:btnuse
            };
        }
        case VIEW_REQUEST_BOOK:{
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
        case DELETE_BOOK:
        case CLOSE_BOOK:{
            return {
                ...state,
                open:false,
                ownerslocation:[]
            };
        }
        case REQUIRE_LOGIN:{
            return {
                ...state,
                tologin:true
            }
        }
        case CANCEL_LOGIN:
        case SUCCESS_LOGIN:{
            return {
                ...state,
                tologin:false
            }
        }
        case GET_USERS_LOCATION:{
            return{
                ...state,
                ownerslocation :action.payload
            }
        }
        case ADD_EXCHANGE:{
            return{
                ...state,
                open:false
            }
        }

    }
    return state;
}