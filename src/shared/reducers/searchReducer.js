export default function reducer(state={
    books:[],
    error: null
},action){
    switch(action.type) {
        case "START_SEARCH":{
            return {
                ...state
            }
            
        }
        case "NEW_SEARCH": {
            return{
                ...state,
                books:action.payload
            }
        }
        case "SEARCH_ERROR":{
            return {
                ...state,
                error:action.payload
            }
        }
    }
    return state;
}