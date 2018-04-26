export default function reducer(state={
    open:false,
    message:''
}, action){
    switch(action.type){
        case "SHOW_ALERT":{
            return {
                ...state,
                open:true,
                message: action.payload
            }
        }
        case "CLOSE_ALERT":{
            return {
                ...state,
                open:false
            }
        }
    }
    return state;
}