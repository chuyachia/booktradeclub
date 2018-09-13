import {START_SEARCH_BOOK, SUCCESS_SEARCH_BOOK, ERROR_SEARCH_BOOK} from "../constants/actionTypes";

export default function reducer(state={
    loading:false,
    books:[],
    error: false
},action){
    switch(action.type) {
        case START_SEARCH_BOOK:{
            return {
                ...state,
                loading:true,
                error:false,
                books:[]
            };
            
        }
        case SUCCESS_SEARCH_BOOK: {
            return{
                ...state,
                loading:false,
                books:action.payload
            };
        }
        case ERROR_SEARCH_BOOK:{
            return {
                ...state,
                loading:false,
                error:true
            };
        }
    }
    return state;
}