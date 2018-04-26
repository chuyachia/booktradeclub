export default function reducer(state={
    loading:false,
    books:[],
    error: false
},action){
    switch(action.type) {
        case "START_SEARCH":{
            return {
                ...state,
                loading:true,
                error:false,
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
                loading:false,
                error:true
            }
        }
    }
    return state;
}