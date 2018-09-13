import {SHOW_ALERT, CLOSE_ALERT} from "../constants/actionTypes";

export function showAlert(){
    return {
        type:SHOW_ALERT
    };
}

export function closeAlert(){
    return {
        type:CLOSE_ALERT
    };
}
