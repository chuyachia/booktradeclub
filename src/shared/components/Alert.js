import {connect} from "react-redux";
import React from 'react';
import {closeAlert} from "../actions/alertAction";
import { bindActionCreators } from 'redux';

var Alert = ({open,closeAlert}) =>(
        <div>
            {open&&<div class="alert alert-warning alert-dismissible fade show" role="alert">
                  <strong>Oops! Something went wrong!</strong> The action just failed. Please try again later.
                  <button type="button" class="close" data-dismiss="alert" aria-label="Close" onClick={closeAlert}>
                    <span aria-hidden="true">&times;</span>
                  </button>
            </div>}
        </div>    
    );
    

var dispathMap = (dispatch)=>bindActionCreators({closeAlert},dispatch);

var propsMap = (store)=>{
    return{
        open: store.alerts.open
    };
};

export default connect(propsMap,dispathMap)(Alert);