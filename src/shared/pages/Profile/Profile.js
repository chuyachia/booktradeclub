import {changePage} from "../../actions/profileAction";
import { connect } from "react-redux";
import Modal from "../../components/Modal"
import React from "react";
import RequestList from "../../components/RequestList"
import Search from "../../components/Search"
import "./Profile.css";

class Profile extends React.Component {
    constructor(){
        super()
    }
    changePage(target){
        this.props.dispatch(changePage(target));
    }
    render(){
        var underline={ textDecoration: "underline"};
        return(
        <div class="row container">
            <div class="col-md-6 connect"><span style={this.props.page=="search"?underline:null} onClick={()=>this.changePage("search")}>Add a new book</span></div>
            <div class="col-md-6 connect"><span style={this.props.page=="requests"?underline:null} onClick={()=>this.changePage("requests")}>Requests</span></div>
            <div class="col-md-12">{this.props.page=="search"?<Search/>:<RequestList/>}</div>
            <Modal btnuse="addbook"/>
        </div>
        )
    }
}

var propsMap = (store)=>{
    return {
        page : store.userinfo.page
    };
};

export default connect(propsMap)(Profile);
