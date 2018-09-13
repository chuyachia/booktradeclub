import {VIEW_REQUEST,GET_SENDER_BOOKS,ADD_EXCHANGE,CONFIRM_TRADE,DECLINE_TRADE} from "../constants/actionTypes";


export default function reducer(state={
    open:false,
    info:{},
    senderbooks:[]
},action){
    switch(action.type) {
        case VIEW_REQUEST:{
            return {
                ...state,
                info:action.payload,
            };
        }
        case GET_SENDER_BOOKS:{
            return{
                ...state,
                senderbooks:action.payload
            };
        }
        case ADD_EXCHANGE:{
            return {
                ...state,
                info:{
                    ...state.info,
                    sender:{...state.info.sender, 
                        bookId:action.payload.bookid,
                        bookName:action.payload.bookname,
                    }
                }
            };
        }
        case CONFIRM_TRADE:{
            return{
                ...state,
                info:{
                    ...state.info,
                    status:"confirmed",
                    receiver:{
                        ...state.info.receiver,
                    }
                }
            };
        }
        case DECLINE_TRADE:{
            return{
                ...state,
               info:{
                    ...state.info,
                    status:"declined",
                    receiver:{
                        ...state.info.receiver,
                    }
                }
            };
        }


    }
    return state;
}