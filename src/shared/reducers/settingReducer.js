import {CONNECT_CHANGE_TAB,REDIRECT,PROFILE_CHANGE_TAB,START_CHANGE_EMAIL,START_CHANGE_LOCATION,
    START_CHANGE_PASSWORD,SUCCESS_CHANGE_PASSWORD,CANCEL_CHANGE,SUCCESS_CHANGE_USERINFO,
    REMOVE_SUCCESS_MESSAGE,FAIL_CHANGE_PASSWORD
} from "../constants/actionTypes";

export default function reducer(state={
    editemail:false,
    editlocation:false,
    editpassword:false,
    psunmatch:false,
    changedsucess:false,
    profiletab:"mybooks",
    connecttab:"login",
    redirect:false
},action){
    switch(action.type) {
        case PROFILE_CHANGE_TAB:{
            return{
                ...state,
                profiletab:action.payload
            }
        }
        case CONNECT_CHANGE_TAB:{
            return{
                ...state,
                connecttab:action.payload
            }
        }
        case START_CHANGE_EMAIL:{
            return{
                ...state,
                editemail:true,
                editlocation:false,
                editpassword:false
            }
        }
        case START_CHANGE_LOCATION:{
            return{
                ...state,
                editlocation:true,
                editemail:false,
                editpassword:false
            }
        }
        case START_CHANGE_PASSWORD:{
            return{
                ...state,
                editpassword:true,
                editemail:false,
                editlocation:false
                
            }
        }
        case SUCCESS_CHANGE_PASSWORD:{
            return{
                ...state,
                changedsucess:true,
                editemail:false,
                editlocation:false,
                editpassword:false,
                psunmatch:false
            }
        }
        case CANCEL_CHANGE:
        case SUCCESS_CHANGE_USERINFO:{
            return{
                ...state,
                editemail:false,
                editlocation:false,
                editpassword:false,
                psunmatch:false
            }
        }
        case REMOVE_SUCCESS_MESSAGE:{
            return{
                ...state,
                changedsucess:false
            }
        }
        case FAIL_CHANGE_PASSWORD:{
            return{
                ...state,
                psunmatch:true
            }
        }
        case REDIRECT:{
            return{
                ...state,
                redirect:true
            }
        }
    }
    return state;
}