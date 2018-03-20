import {connect} from "react-redux";
import {viewRequest} from "../actions/profileAction";
import { Link } from 'react-router-dom';
import React from "react";

class RequestList extends React.Component{
  constructor(){
      super()
  }
  viewRequest(request){
        this.props.dispatch(viewRequest(request));
    }
  render(){
      return(
          <div>
              <div class="col-md-6">
                  <ul>
                  {this.props.inrequests.map((request,i)=>(
                  <li key={i} onClick={()=> this.viewRequest(request)}>
                  <Link to="/request">Request received from {request.sender.username}</Link></li>)
                  )}
                  </ul>
              </div>
              <div class="col-md-6">
                  <ul>
                  {this.props.outrequests.map((request,i)=>(
                  <li key={i} onClick={()=> this.viewRequest(request)}>
                  <Link to="/request">Request sent to {request.receiver.username}</Link></li>))}
                  </ul>
              </div>
              
          </div>
          )
  }
};

var propsMap = (store)=>{
    return {
        username:store.userinfo.username,
        inrequests : store.userinfo.inrequests,
        outrequests :store.userinfo.outrequests
    };
};

export default connect(propsMap)(RequestList);