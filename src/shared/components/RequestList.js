import {connect} from "react-redux";
import React from "react";
import {getAllRequests,deleteRequest} from "../actions/requestAction";
import RequestItem from "./RequestItem";

class RequestList extends React.Component{
    componentWillMount(){
        if (this.props.username){
            this.props.getAllRequests(this.props.username);
        }
    }
    renderIncomingRequestItem = (request)=><RequestItem key={request._id} request={request} type="incoming" onClick={this.props.deleteRequest}/>
    renderOutgoingRequestItem = (request)=><RequestItem key={request._id} request={request} type="outgoing" onClick={this.props.deleteRequest}/>

    render(){
        return(
          <div >
            <div class="row">
              <div class="col-md-6">
                  <ul class="list-unstyled">
                  <li><strong>Requests received</strong></li>
                  {this.props.inrequests.length==0&&<li>Nothing to show...</li>}
                  {this.props.inrequests.map(this.renderIncomingRequestItem)}
                  </ul>
              </div>
              <div class="col-md-6">
                  <ul class="list-unstyled">
                  <li><strong>Requests sent</strong></li>
                  {this.props.outrequests.length==0&&<li>Nothing to show...</li>}
                  {this.props.outrequests.map(this.renderOutgoingRequestItem)}
                  </ul>
              </div>
              </div>
          </div>
        )
    }
};

var dispatchMap = {getAllRequests,deleteRequest};

var propsMap = (store)=>{
    return {
        username:store.userinfo.username,
        inrequests : store.userinfo.inrequests,
        outrequests :store.userinfo.outrequests
    };
};

export default connect(propsMap,dispatchMap)(RequestList);