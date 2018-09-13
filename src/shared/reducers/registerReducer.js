import {ADD_USER,DUPLICATED_USERNAME,REDIRECT,REFRESH} from "../constants/actionTypes";

export default function reducer(state={
    registered:false,
    result:null,
    redirect:null,
},action){
    switch(action.type) {
        case ADD_USER:{
            return {
                ...state,
                registered:true,
                result:'success'
            }
        }
        case DUPLICATED_USERNAME: {
            return{
                ...state,
                registered:true,
                result:'duplicated'
            }
        }
        case REDIRECT:{
            return {
                ...state,
                redirect:action.payload
            }
        }
        case REFRESH:{
            return {
                ...state,
                registered:false
            }
        }
    }
    return state;
}