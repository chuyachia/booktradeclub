import {connect} from "react-redux";
import React from 'react';
import {closeAlert} from "../actions/alertAction";

class Alert extends React.Component {
    constructor(){
        super();
    }
    closeAlert(){
        this.props.dispatch(closeAlert());
    }
    render(){
        return(
            <div>{this.props.open&&<div class="alert alert-warning alert-dismissible fade show" role="alert">
                  <strong>Oops! Something went wrong with the server!</strong> The action just failed. Please try again later.
                  <button type="button" class="close" data-dismiss="alert" aria-label="Close" onClick={this.closeAlert.bind(this)}>
                    <span aria-hidden="true">&times;</span>
                  </button>
            </div>}</div>
        );
    }
}

var propsMap = (store)=>{
    return{
        open: store.alerts.open,
        message:store.alerts.message
    };
};

export default connect(propsMap)(Alert);