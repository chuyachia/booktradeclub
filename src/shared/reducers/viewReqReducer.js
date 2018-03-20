export default function reducer(state={
    open:false,
    info:{},
    senderbooks:[]
},action){
    switch(action.type) {
        case "VIEW_REQUEST":{
            return {
                ...state,
                info:action.payload.tradeinfo,
                senderbooks:action.payload.senderbooks
            };
        }
        case "NEW_EXCHANGE_ADDED" :{
            return {
                ...state,
                info:{
                    ...state.info,
                    sender:{...state.info.sender, 
                        bookId:action.payload.bookid,
                        bookName:action.payload.bookname
                    }
                }
            }
        }
        case "TRADE_CONFIRMED":{
            return{
                ...state,
                info:{
                    ...state.info,
                    confirmed:true
                }
            }
        }
    }
    return state;
}