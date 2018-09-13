import {START_GET_ALL_BOOKS, SUCCESS_GET_ALL_BOOKS, ERROR_GET_ALL_BOOKS} from "../constants/actionTypes";

export default function reducer(state={
    books:[],
    loading:true,
    error:false
},action){
    switch(action.type) {
        case START_GET_ALL_BOOKS:{
            return {
                ...state
            };
            
        }
        case SUCCESS_GET_ALL_BOOKS: {
            return{
                ...state,
                loading:false,
                books:action.payload,
                error:false
            };
        }
        case ERROR_GET_ALL_BOOKS:{
            return {
                ...state,
                loading:false,
                error:true
            };
        }
    }
    return state;
}