import {combineReducers} from "redux";
import alerts from "./alertReducer";
import searches from "./searchReducer";
import setting from "./settingReducer";
import userinfo from "./userinfoReducer";
import allbooks from "./allBooksReducer";
import viewbook from "./viewBookReducer";
import viewreq from "./viewReqReducer";
import register from "./registerReducer";

export default combineReducers({alerts,searches,viewbook,viewreq,allbooks,register,userinfo,setting});