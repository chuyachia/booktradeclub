export default function reducer(state={
    open:false
}, action){
    switch(action.type){
        case "SHOW_ALERT":{
            return {
                ...state,
                open:true
            };
        }
        case "CLOSE_ALERT":{
            return {
                ...state,
                open:false
            };
        }
    }
    return state;
}