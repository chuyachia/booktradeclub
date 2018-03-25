export default function reducer(state={
    loading:false,
    books:[],
    error: null
},action){
    switch(action.type) {
        case "START_SEARCH":{
            return {
                ...state,
                loading:true,
                books:[]
            }
            
        }
        case "NEW_SEARCH": {
            return{
                ...state,
                loading:false,
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