import {combineReducers} from "redux";
import searches from "./searchReducer";
import userinfo from "./userinfoReducer";
import queries from "./queryReducer";
import viewbook from "./viewBookReducer";
import viewreq from "./viewReqReducer";
import register from "./registerReducer";

export default combineReducers({searches,viewbook,viewreq,queries,register,userinfo});