export default function reducer(state={
    books:[],
    loading:true,
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
                loading:false,
                books:action.payload
            }
        }
        case "QUERY_ERROR":{
            return {
                ...state,
                loading:false,
                error:action.payload
            }
        }
    }
    return state;
}