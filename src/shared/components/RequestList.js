import {connect} from "react-redux";
import { Link } from 'react-router-dom';
import React from "react";
import {viewRequest,getAllRequests,getSenderBooks,deleteRequest} from "../actions/requestAction";

class RequestList extends React.Component{
    constructor(){
      super();
    }
    viewRequest(request,role,unread){
        this.props.dispatch(viewRequest(request,role,unread));
    }
    getSenderBooks(username){
        this.props.dispatch(getSenderBooks(username));
    }
    deleteRequest(id){
        this.props.dispatch(deleteRequest(id));
    }
    componentWillMount(){
        if (this.props.username){
        this.props.dispatch(getAllRequests(this.props.username));
        }
    }
    tradeStatus(status){
        switch(status){
            case "pending":
               return (<span class="badge badge-secondary">Pending</span>);
            case "confirmed":
               return (<span class="badge badge-success">Confirmed</span>);
            case "declined":
                return (<span class="badge badge-light">Declined</span>);
        }
   }

  render(){
      return(
          <div >
            <div class="row">
              <div class="col-md-6">
                  <ul class="list-unstyled">
                  <li><strong>Requests received</strong></li>
                  {this.props.inrequests.length==0&&<li>Nothing to show...</li>}
                  {this.props.inrequests.map(request=>(
                  <li key={request._id}>
                      <Link to="/request" onClick={()=> {
                        this.viewRequest(request,"receiver",request.receiver.unread);
                        this.getSenderBooks(request.sender.username);
                      }}>{request.sender.username} requested your <em>{request.receiver.bookName}</em></Link>
                      &nbsp;{this.tradeStatus(request.status)}&nbsp;
                      {request.receiver.unread&&<span class="badge badge-pill badge-warning">New</span>}
                      &nbsp;<i class="fas fa-trash" style={{cursor:"pointer"}} onClick={()=>this.deleteRequest(request._id)}/>&nbsp;
                  </li>)
                  )}
                  </ul>
              </div>
              <div class="col-md-6">
                  <ul class="list-unstyled">
                  <li><strong>Requests sent</strong></li>
                  {this.props.outrequests.length==0&&<li>Nothing to show...</li>}
                  {this.props.outrequests.map(request=>(
                  <li key={request._id}>
                      <Link to="/request" 
                        onClick={()=> this.viewRequest(request,"sender",request.sender.unread)}>
                        You requested {request.receiver.username}'s <em>{request.receiver.bookName}</em></Link>
                      &nbsp;{this.tradeStatus(request.status)}&nbsp;
                      {request.sender.unread&&<span class="badge badge-pill badge-warning">New</span>}
                      &nbsp;<i class="fas fa-trash" style={{cursor:"pointer"}} onClick={()=>this.deleteRequest(request._id)}/>&nbsp;
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