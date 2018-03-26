import {applyMiddleware,createStore} from "redux";
import logger from "redux-logger";
import promise from "redux-promise-middleware";
import reducer from "./reducers";
import thunk from "redux-thunk";

var middleware;

if(process.env.NODE_ENV == "development"){
    middleware = applyMiddleware(promise(),thunk,logger());
} else {
   middleware = applyMiddleware(promise(),thunk); 
}

const configureStore = preloadedState =>
  createStore(reducer, preloadedState, middleware);
  
export default configureStore;