export default function reducer(state={
    books:[],
    loading:true,
    error:false
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
                books:action.payload,
                error:false
            }
        }
        case "QUERY_ERROR":{
            return {
                ...state,
                loading:false,
                error:true
            }
        }
    }
    return state;
}