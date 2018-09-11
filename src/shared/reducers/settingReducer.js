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
        case "PROFILE_CHANGE_TAB":{
            return{
                ...state,
                profiletab:action.payload
            }
        }
        case "CONNECT_CHANGE_TAB":{
            return{
                ...state,
                connecttab:action.payload
            }
        }
        case "CHANGE_EMAIL":{
            return{
                ...state,
                editemail:true,
                editlocation:false,
                editpassword:false
            }
        }
        case "CHANGE_LOCATION":{
            return{
                ...state,
                editlocation:true,
                editemail:false,
                editpassword:false
            }
        }
        case "CHANGE_PASSWORD":{
            return{
                ...state,
                editpassword:true,
                editemail:false,
                editlocation:false
                
            }
        }
        case "PASSWORD_CHANGED":{
            return{
                ...state,
                changedsucess:true,
                editemail:false,
                editlocation:false,
                editpassword:false,
                psunmatch:false
            }
        }
        case "CANCEL_CHANGE":
        case "USER_INFO_CHANGED":{
            return{
                ...state,
                editemail:false,
                editlocation:false,
                editpassword:false,
                psunmatch:false
            }
        }
        case "SUCCESS_OFF":{
            return{
                ...state,
                changedsucess:false
            }
        }
        case "PASSWORD_MATCH_FAIL":{
            return{
                ...state,
                psunmatch:true
            }
        }
        case "REDIRECT":{
            return{
                ...state,
                redirect:true
            }
        }
    }
    return state;
}