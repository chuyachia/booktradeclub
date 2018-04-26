// allow delete book in my books
import Alert from "../../components/Alert";
import BookCard from "../../components/BookCard";
import {changePage} from "../../actions/userAction";
import { connect } from "react-redux";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar"
import Modal from "../../components/Modal";
import PersonalInfo from "../../components/PersonalInfo";
import React from "react";
import RequestList from "../../components/RequestList";
import Search from "../../components/Search";
import "./Profile.css";

class Profile extends React.Component {
    constructor(){
        super();
    }
    changePage(target){
        this.props.dispatch(changePage(target));
    }
    switchReturn(){
        switch(this.props.page){
           case "search":
               return <Search/>;
           case "requests":
               return <RequestList/>;
           case "mybooks":
               return (<div>{this.props.ownedbooks.map((book,i)=> (
                <BookCard key={i} info={book} modaluse="removebook"/>
                ))}</div>);
        }
    }
    render(){
        return(
            <div class="container">
            <NavBar/>
            <Alert/>
            <div class="row">
                <div class="col-md-12">
                <PersonalInfo/>
                </div>
                <div class="col-md-12">
                <ul class="nav nav-tabs nav-fill">
                 <li class="nav-item">
                    <a class={this.props.page=="mybooks"?"nav-link active":"nav-link"} onClick={()=>this.changePage("mybooks")}>
                    {this.props.page=="mybooks"?(<strong>My books</strong>):"My books"}</a>
                  </li>
                  <li class="nav-item">
                    <a class={this.props.page=="search"?"nav-link active":"nav-link"} onClick={()=>this.changePage("search")}>
                    {this.props.page=="search"?(<strong>Add new books</strong>):"Add new books"}</a>
                  </li>
                   <li class="nav-item">
                    <a class={this.props.page=="requests"?"nav-link active":"nav-link"} onClick={()=>this.changePage("requests")}>
                    {this.props.page=="requests"?(<strong>View requests</strong>):"View requests"}&nbsp;
                    {this.props.unread>0&&<span class="badge badge-pill badge-warning">{this.props.unread} new</span>}
                    </a>
                  </li>
                </ul>
                </div>
               <div class="col-md-12">
               {this.switchReturn()}
               <Modal/>
               </div>
            </div>
            <Footer/>
            </div>
        )
    }
}

var propsMap = (store)=>{
    var unreadin= store.userinfo.inrequests.filter(request=>request.receiver.unread==true);
    var unreadout = store.userinfo.outrequests.filter(request=>request.sender.unread==true);
    return {
        page : store.setting.page,
        ownedbooks:store.userinfo.ownedbooks,
        unread: unreadin.length+unreadout.length
    };
};

export default connect(propsMap)(Profile);
