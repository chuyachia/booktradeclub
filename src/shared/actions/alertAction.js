export function showAlert(){
    return function(dispatch){
        dispatch({
            type:"SHOW_ALERT"
        })
    }
}

export function closeAlert(){
    return function(dispatch){
        dispatch({
            type:"CLOSE_ALERT"
        })
    }
}