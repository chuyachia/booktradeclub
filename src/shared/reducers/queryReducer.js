export default function reducer(state={
    books:[],
    error: null
},action){
    switch(action.type) {
        case "START_QUERY":{
            return {
                ...state
            }
            
        }
        case "NEW_QUERY": {
            return{
                ...state,
                books:action.payload
            }
        }
        case "QUERY_ERROR":{
            return {
                ...state,
                error:action.payload
            }
        }
    }
    return state;
}