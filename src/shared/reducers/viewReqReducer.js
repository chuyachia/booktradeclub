// unnecessary modify unread here
// all requests will be refetch when back to request list
export default function reducer(state={
    open:false,
    info:{},
    senderbooks:[],
    error:false
},action){
    switch(action.type) {
        case "OPEN_REQUEST":{
            return{
                ...state,
                info:{},
                error:false
            }
        }
        case "VIEW_REQUEST":{
            return {
                ...state,
                info:action.payload,
            };
        }
        case "SENDER_BOOKS":{
            return{
                ...state,
                senderbooks:action.payload
            }
        }
        case "NEW_EXCHANGE_ADDED" :{
            return {
                ...state,
                info:{
                    ...state.info,
                    sender:{...state.info.sender, 
                        bookId:action.payload.bookid,
                        bookName:action.payload.bookname,
                    }
                },
                error:false
            }
        }
        case "TRADE_CONFIRMED":{
            return{
                ...state,
                info:{
                    ...state.info,
                    status:"confirmed",
                    receiver:{
                        ...state.info.receiver,
                    }
                },
                error:false
            }
        }
        case "TRADE_DECLINED":{
            return{
                ...state,
               info:{
                    ...state.info,
                    status:"declined",
                    receiver:{
                        ...state.info.receiver,
                    }
                },
                error:false
            }
        }
        case "REQUEST_ACTION_ERROR":{
            return{
                ...state,
                error:true
            }
        }
        case "ALERT_CLOSE":{
            return {
                ...state,
                error:false
            }
        }

    }
    return state;
}