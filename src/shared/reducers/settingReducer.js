export default function reducer(state={
    editemail:false,
    editlocation:false,
    page:"mybooks",

},action){
    switch(action.type) {
        case "CHANGE_PAGE":{
            return{
                ...state,
                page:action.payload
            }
        }
        case "CHANGE_EMAIL":{
            return{
                ...state,
                editemail:true,
                editlocation:false
            }
        }
        case "CHANGE_LOCATION":{
            return{
                ...state,
                editlocation:true,
                editemail:false
                
            }
        }
        case "USER_INFO_CHANGED":
        case "CANCEL_CHANGE":{
            return{
                ...state,
                editemail:false,
                editlocation:false,
            }
        }
    }
    return state;
}