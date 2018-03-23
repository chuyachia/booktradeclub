// allow view book info when click book name in conversation. how to pass book information to modal? init an axios call to search
// in books collection?
import {connect} from "react-redux";
import { Link } from 'react-router-dom';
import Modal from "./Modal";
import React from 'react';
import {viewBook,addExchange,confirmTrade,declineTrade} from "../actions/profileAction";

class Request extends React.Component{
    constructor(props){
        super(props);
    }
    viewBooksExchange(bookinfo){
        this.props.dispatch(viewBook(bookinfo,"answersender"));
    }
    /*viewBooksInfo(bookinfo){
        this.props.dispatch(viewBook(bookinfo,"info"));
    }*/
    addExchange(bookid,bookname){
        this.props.dispatch(addExchange(bookid,bookname,this.props.info._id));
    }
    confirmTrade(){
        this.props.dispatch(confirmTrade(this.props.info._id));
    }
    declineTrade(){
        this.props.dispatch(declineTrade(this.props.info._id));
    }

    render(){
        function requestInit(book){
            return (<p>I'm interested in the book <b>{book}</b> in your collection. Have a look at the books that I have to exchange!</p>);
        }
        function requestRes(book){
            return (<p>I would accept to exchange my book with your <b>{book}</b>.</p>);
        }
        function requestConfirm(){
            return (<p>OK! That's call it a deal.</p>);
        }
        function instructWaint(name){
            return (<p>Waiting for {name}'s response</p>)
        }
        function reqeustDecline(){
            return(<p>Sorry, I'm not interested.</p>)
        }

        if (this.props.info.sender&&this.props.info.receiver){
            var sender = this.props.info.sender.username==this.props.username?"You":this.props.info.sender.username;
            var receiver = sender=="You"?this.props.info.receiver.username:"You";

            return (
            <div class="container">
            <nav class="navbar navbar-dark bg-dark fixed-top">
              <Link class="navbar-brand" to="/profile"><i class="fas fa-arrow-left"></i></Link>
            </nav>
                <div class={sender=="You"?"card col-md-5 offset-md-7":"card col-md-5"}>
                    <div class="card-body">
                        <h4 class="card-title">{sender}</h4>{requestInit(this.props.info.receiver.bookName)}
                    </div>
                </div>
                
                {!this.props.info.sender.bookName&&this.props.info.status=="declined"&&(<div class={receiver=="You"?"card col-md-5 offset-md-7":"card col-md-5"}>
                    <div class="card-body">
                        <h4 class="card-title">{receiver}</h4>
                        {reqeustDecline()}
                    </div>
                </div>)}
               
                {this.props.info.sender.bookName&&(<div class={receiver=="You"?"card col-md-5 offset-md-7":"card col-md-5"}>
                    <div class="card-body">
                        <h4 class="card-title">{receiver}</h4>
                        {requestRes(this.props.info.sender.bookName)}
                    </div>
                </div>)}
                
                {this.props.info.sender.bookName&&this.props.info.status=="confirmed"&&(<div class={sender=="You"?"card col-md-5 offset-md-7":"card col-md-5"}>
                    <div class="card-body">
                        <h4 class="card-title">{sender}</h4>
                        {requestConfirm()}
                    </div>
                </div>)}
                
                {this.props.info.sender.bookName&&this.props.info.status=="declined"&&(<div class={sender=="You"?"card col-md-5 offset-md-7":"card col-md-5"}>
                    <div class="card-body">
                        <h4 class="card-title">{sender}</h4>
                        {reqeustDecline()}
                    </div>
                </div>)}
                
                {sender=="You"?
                (<div class="usercontrol">
                    {!this.props.info.sender.bookName&&this.props.info.status=="pending"&&(
                    <div>{instructWaint(this.props.info.receiver.username)}</div>)}
                    
                    {this.props.info.sender.bookName&&this.props.info.status=="pending"&&(
                    <div>Do you want to accept this exchange?
                    <div>
                        <button class="btn btn-raised" onClick={this.confirmTrade.bind(this)}>Accept request</button>
                        <button class="btn btn-raised" onClick={this.declineTrade.bind(this)}>Decline request</button>
                        <Link class="btn btn-raised" to="/profile">Decide later</Link>
                    </div>
                    </div>)}
                    
                    {this.props.info.sender.bookName&&this.props.info.status=="confirmed"&&(
                    <div><p>The exchange has concluded. You can contact user at email to arrange meetup</p>
                    </div>)}
                    
                    {this.props.info.status=="declined"&&(
                    <div><p>The exchange has ended without success.</p>
                    </div>)}
                </div>):
                (<div class="usercontrol">
                    {!this.props.info.sender.bookName&&this.props.info.status=="pending"&&(
                    <div class="booklistwrap">Here's what {this.props.info.sender.username} has to offer, choose a book to trade
                        <ul class="booklist list-unstyled">{this.props.senderbooks.map((book,i)=>(
                            <li key={i} style={{cursor:"pointer"}} onClick={()=> this.viewBooksExchange(book)}>
                            <strong>{book.title}</strong></li>
                        ))}</ul>
                    <div>
                        <button class="btn btn-raised" onClick={this.declineTrade.bind(this)}>Decline request</button>
                        <Link class="btn btn-raised" to="/profile">Decide later</Link>
                    </div>
                    </div>)}
                    
                    {this.props.info.sender.bookName&&this.props.info.status=="pending"&&(<div>
                    {instructWaint(this.props.info.sender.username)}
                    </div>)}
                    
                    {this.props.info.sender.bookName&&this.props.info.status=="confirmed"&&(
                    <div><p>The exchange has concluded. You can contact user at email to arrange meetup</p>
                    </div>)}
                    {this.props.info.status=="declined"&&(
                    <div><p>The exchange has ended without success.</p>
                    </div>)}
                </div>)
                }
                <Modal addexchange={this.addExchange.bind(this)}/>
            </div>)
        } else {
            return(null)
        }
    }
    
}

var propsMap = (store)=>{
    return{
        info:store.viewreq.info,
        senderbooks : store.viewreq.senderbooks,
        username : store.userinfo.username,
    };
};

export default connect(propsMap)(Request);
