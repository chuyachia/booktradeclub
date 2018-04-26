// unnecessary modify unread here
// all requests will be refetch when back to request list
export default function reducer(state={
    open:false,
    info:{},
    senderbooks:[]
},action){
    switch(action.type) {
        case "OPEN_REQUEST":{
            return{
                ...state,
                info:{},
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
                }
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
                }
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
                }
            }
        }


    }
    return state;
}