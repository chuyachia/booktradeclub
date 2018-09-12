import Alert from "../components/Alert";
import BookCard from "../components/BookCard";
import {changePage} from "../actions/userAction";
import { connect } from "react-redux";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Modal from "../components/Modal";
import PersonalInfo from "../components/PersonalInfo";
import React from "react";
import RequestList from "../components/RequestList";
import Search from "../components/Search";


var Profile = ({profiletab,unread,ownedbooks,changePage})=> {
    var switchReturn = (page,ownedbooks)=>{
        switch(page){
            case "search":
               return <Search/>;
            case "requests":
               return <RequestList/>;
            case "mybooks":
               return (<div>{ownedbooks.map(book=> (
                <BookCard key={book._id} info={book} modaluse="removebook"/>
                ))}</div>);
        }
    };
    var toMybooks = ()=>changePage("mybooks");
    var toSearch = ()=>changePage("search");
    var toRequests = ()=> changePage("requests");
    return (
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
                    <a class={profiletab=="mybooks"?"nav-link active":"nav-link"} onClick={toMybooks}>
                    {profiletab=="mybooks"?(<strong>My books</strong>):"My books"}</a>
                  </li>
                  <li class="nav-item">
                    <a class={profiletab=="search"?"nav-link active":"nav-link"} onClick={toSearch}>
                    {profiletab=="search"?(<strong>Add new books</strong>):"Add new books"}</a>
                  </li>
                   <li class="nav-item">
                    <a class={profiletab=="requests"?"nav-link active":"nav-link"} onClick={toRequests}>
                    {profiletab=="requests"?(<strong>View requests</strong>):"View requests"}&nbsp;
                    {unread>0&&<span class="badge badge-pill badge-warning">{unread} new</span>}
                    </a>
                  </li>
                </ul>
                </div>
               <div class="col-md-12">
               {switchReturn(profiletab,ownedbooks)}
               <Modal/>
               </div>
            </div>
            <Footer/>
        </div>    
        );
    }

var dispathMap = {changePage};

var propsMap = (store)=>{
    var unreadin= store.userinfo.inrequests.filter(request=>request.receiver.unread==true);
    var unreadout = store.userinfo.outrequests.filter(request=>request.sender.unread==true);
    return {
        profiletab:store.setting.profiletab,
        ownedbooks:store.userinfo.ownedbooks,
        unread: unreadin.length+unreadout.length
    };
};

export default connect(propsMap,dispathMap)(Profile);
