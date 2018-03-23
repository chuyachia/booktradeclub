import {connect} from "react-redux";
import { Link } from 'react-router-dom';
import React from "react";
import {viewRequest,getAllRequests,getSenderBooks} from "../actions/profileAction";

class RequestList extends React.Component{
  constructor(){
      super()
  }
  viewRequest(request){
        this.props.dispatch(viewRequest(request));
   }
    getSenderBooks(username){
        this.props.dispatch(getSenderBooks(username));
   }
   componentWillMount(){
       if (this.props.username){
        this.props.dispatch(getAllRequests(this.props.username));
       }
   }
   tradeStatus(status){
       switch(status){
           case "pending":
               return (<span class="badge badge-secondary">Pending</span>)
           case "confirmed":
               return (<span class="badge badge-success">Confirmed</span>)
            case "declined":
                return (<span class="badge badge-light">Declined</span>)
       }
   }

  render(){
      return(
          <div >
            <div class="row">
              <div class="col-md-6">
                  <ul class="list-unstyled">
                  {this.props.inrequests.map((request,i)=>(
                  <li key={i} onClick={()=> {
                    this.viewRequest(request);
                    this.getSenderBooks(request.sender.username)
                  }}>
                  <Link to="/request">Request received from {request.sender.username}</Link>
                  &nbsp;{this.tradeStatus(request.status)}
                  </li>)
                  )}
                  </ul>
              </div>
              <div class="col-md-6">
                  <ul class="list-unstyled">
                  {this.props.outrequests.map((request,i)=>(
                  <li key={i} onClick={()=> this.viewRequest(request)}>
                  <Link to="/request">Request sent to {request.receiver.username}</Link>
                  &nbsp;{this.tradeStatus(request.status)}
                  </li>))}
                  </ul>
              </div>
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