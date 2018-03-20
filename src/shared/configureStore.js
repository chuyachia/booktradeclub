import {applyMiddleware,createStore} from "redux";
import logger from "redux-logger";
import promise from "redux-promise-middleware";
import reducer from "./reducers";
import thunk from "redux-thunk";

const middleware = applyMiddleware(promise(),thunk,logger());

const configureStore = preloadedState =>
  createStore(reducer, preloadedState, middleware);
  
export default configureStore;