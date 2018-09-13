// Avoid using arrow functions to pass parameters in callbacks in render
import Alert from "../components/Alert";
import {connect} from "react-redux";
import Footer from "../components/Footer";
import { Link } from 'react-router-dom';
import Modal from "../components/Modal";
import React from 'react';
import {viewBook} from "../actions/bookAction";
import {confirmTrade,declineTrade,viewRequest,getSenderBooks,viewBooksInfo} from "../actions/requestAction";
import styles from "../css/Request.css";
import ExchangeItem from "../components/ExchangeItem";

class Request extends React.Component{
    constructor(){
        super();
        this.state={
            alertopen:true,
            unauthorized:false
        };
    }
    componentDidMount(){
        var request = this.props.inrequests.concat(this.props.outrequests).filter(request=>
           request._id==this.props.match.params.id);
        if (request.length==1) {
            request = request[0];
            var role = request.receiver.username==this.props.username?'receiver':'sender';
            var unread = role =='receiver'?request.receiver.unread:request.sender.unread;
            this.props.viewRequest(request,role,unread);
            if (role=="receiver") {
                this.props.getSenderBooks(request.sender.username);
            }
        } else {
            this.setState({unauthorized:true});
        }
    }
    confirmTrade = ()=>this.props.confirmTrade(this.props.info._id)
    declineReceiver = ()=>this.props.declineTrade("receiver",this.props.info._id)
    declineSender = ()=>this.props.declineTrade("sender",this.props.info._id)
    renderExchangeItems = (book)=><ExchangeItem key={book._id} book={book} onClick = {this.props.viewBook}/>
    viewReceiverBooksInfo = ()=>this.props.viewBooksInfo(this.props.info.receiver.bookId)
    viewSenderBooksInfo = ()=>this.props.viewBooksInfo(this.props.info.sender.bookId)
    requestInit = ()=> (
            <p>I'm interested in the book 
                <strong style={{cursor:'pointer'}} onClick={this.viewReceiverBooksInfo}>&nbsp;"{this.props.info.receiver.bookName}"&nbsp;</strong>
                in your collection. Have a look at the books that I have for exchange!
            </p>
        )
    requestRes = ()=>(
            <p>I would accept to exchange my book with your 
                <strong style={{cursor:'pointer'}} onClick={this.viewSenderBooksInfo}>&nbsp;"{this.props.info.sender.bookName}"&nbsp;</strong>.
            </p>
        )

    reqeustDecline = ()=>{return (<p>Sorry, I'm not interested.</p>)}
    requestConfirm = ()=>(<p>OK! That's call it a deal.</p>)
    instructWaint = (name)=> (<p>Waiting for {name}'s response.</p>)
    
    render(){
        if (this.props.info.sender&&this.props.info.receiver&&!this.state.unauthorized){
            var sender = this.props.info.sender.username==this.props.username?"You":this.props.info.sender.username;
            var receiver = sender=="You"?this.props.info.receiver.username:"You";

            return (
            <div class="container dialogue">
            <nav class="navbar navbar-dark bg-dark fixed-top">
              <Link class="navbar-brand" to="/profile"><i class="fas fa-arrow-left"></i></Link>
            </nav>
                <Alert/>
                <div class={sender=="You"?"card col-md-5 offset-md-7":"card col-md-5"}>
                    <div class="card-body">
                        <h4 class="card-title">{sender}</h4>
                        {this.requestInit()}
                    </div>
                </div>
                
                {!this.props.info.sender.bookName&&this.props.info.status=="declined"&&(<div class={receiver=="You"?"card col-md-5 offset-md-7":"card col-md-5"}>
                    <div class="card-body">
                        <h4 class="card-title">{receiver}</h4>
                        {this.reqeustDecline()}
                    </div>
                </div>)}
               
                {this.props.info.sender.bookName&&(<div class={receiver=="You"?"card col-md-5 offset-md-7":"card col-md-5"}>
                    <div class="card-body">
                        <h4 class="card-title">{receiver}</h4>
                        {this.requestRes()}
                    </div>
                </div>)}
                
                {this.props.info.sender.bookName&&this.props.info.status=="confirmed"&&(<div class={sender=="You"?"card col-md-5 offset-md-7":"card col-md-5"}>
                    <div class="card-body">
                        <h4 class="card-title">{sender}</h4>
                        {this.requestConfirm()}
                    </div>
                </div>)}
                
                {this.props.info.sender.bookName&&this.props.info.status=="declined"&&(<div class={sender=="You"?"card col-md-5 offset-md-7":"card col-md-5"}>
                    <div class="card-body">
                        <h4 class="card-title">{sender}</h4>
                        {this.reqeustDecline()}
                    </div>
                </div>)}
                {sender=="You"?
                (<div class={`${styles.box} bg-light text-dark`}>
                    {!this.props.info.sender.bookName&&this.props.info.status=="pending"&&(
                    <div>{this.instructWaint(this.props.info.receiver.username)}</div>)}
                    
                    {this.props.info.sender.bookName&&this.props.info.status=="pending"&&(
                    <div>Do you want to accept this exchange?
                    <div>
                        <button class="btn btn-raised" onClick={this.confirmTrade}>Accept request</button>
                        <button class="btn btn-raised" onClick={this.declineReceiver}>Decline request</button>
                        <Link class="btn btn-raised" to="/profile">Decide later</Link>
                    </div>
                    </div>)}
                    
                    {this.props.info.sender.bookName&&this.props.info.status=="confirmed"&&(
                    <div><p>The exchange has successfully concluded. You can contact {this.props.info.receiver.username} at <strong>
                    <a href={"mailto:"+this.props.info.receiver.email}>{this.props.info.receiver.email}</a></strong> to arrange the details of the exchange</p>
                    </div>)}
                    
                    {this.props.info.status=="declined"&&(
                    <div><p>The exchange has ended without success.</p>
                    </div>)}
                </div>):
                (<div class={`${styles.box} bg-light text-dark`}>
                    {!this.props.info.sender.bookName&&this.props.info.status=="pending"&&(
                    <div class={`${styles.wrap} bg-light text-dark`}>Here's what {this.props.info.sender.username} has to offer, choose a book to trade
                        <ul class={`${styles.scroll} list-unstyled`}>
                            {this.props.senderbooks.map(this.renderExchangeItems)}
                        </ul>
                    <div>
                        <button class="btn btn-raised" onClick={this.declineSender}>Decline request</button>
                        <Link class="btn btn-raised" to="/profile">Decide later</Link>
                    </div>
                    </div>)}
                    
                    {this.props.info.sender.bookName&&this.props.info.status=="pending"&&(<div>
                    {this.instructWaint(this.props.info.sender.username)}
                    </div>)}
                    
                    {this.props.info.sender.bookName&&this.props.info.status=="confirmed"&&(
                    <div><p>The exchange has successfully concluded. You can contact {this.props.info.sender.username} at <strong>
                    <a href={"mailto:"+this.props.info.sender.email}>{this.props.info.sender.email}</a></strong> to arrange the details of the exchange</p>
                    </div>)}
                    {this.props.info.status=="declined"&&(
                    <div><p>The exchange has ended without success.</p>
                    </div>)}
                </div>)
                }
                <Modal tradeid={this.props.info._id}/>
                <Footer/>
            </div>);
        } else {
            return(null);
        }
    }
    
}

var dispatchMap = {viewRequest,viewBook,viewBooksInfo,confirmTrade,declineTrade,getSenderBooks};

var propsMap = (store)=>({
        info:store.viewreq.info,
        senderbooks : store.viewreq.senderbooks,
        username : store.userinfo.username,
        inrequests : store.userinfo.inrequests,
        outrequests :store.userinfo.outrequests,
        email:store.userinfo.email
    });

export default connect(propsMap,dispatchMap)(Request);
