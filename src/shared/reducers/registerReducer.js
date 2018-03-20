export default function reducer(state={
    registered:false,
    result:null,
    redirect:null,
},action){
    switch(action.type) {
        case "NEW_USER_ADDED":{
            return {
                ...state,
                registered:true,
                result:'success'
            }
        }
        case "USERNAME_DUPLICATED": {
            return{
                ...state,
                registered:true,
                result:'duplicated'
            }
        }
        case "ADD_USER_ERROR":{
            return {
                ...state,
                registered:true,
                result:'error'
            }
        }
        case "REDIRECT":{
            return {
                ...state,
                redirect:action.payload
            }
        }
        case "REFRESH":{
            return {
                ...state,
                registered:false
            }
        }
    }
    return state;
}