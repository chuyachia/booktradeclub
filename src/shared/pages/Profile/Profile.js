// allow delete book in my books
import BookCard from "../../components/BookCard";
import {changePage} from "../../actions/profileAction";
import { connect } from "react-redux";
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
                {this.props.page=="requests"?(<strong>View requests</strong>):"View requests"}</a>
              </li>
            </ul>
            </div>
           <div class="col-md-12">
           {this.switchReturn()}
           <Modal/>
           </div>
        </div>
        </div>
        )
    }
}

var propsMap = (store)=>{
    return {
        page : store.setting.page,
        ownedbooks:store.userinfo.ownedbooks
    };
};

export default connect(propsMap)(Profile);
