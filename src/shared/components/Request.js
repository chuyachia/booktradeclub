import {connect} from "react-redux";
import { Link } from 'react-router-dom';
import Modal from "./Modal";
import React from 'react';
import {viewBook,addExchange,confirmTrade,declineTrade} from "../actions/profileAction";

class Request extends React.Component{
    constructor(props){
        super(props);
    }
    viewBooks(bookinfo){
        this.props.dispatch(viewBook(bookinfo,"answersender"));
    }
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
            return (<p>I'm interested in the book <b>{book}</b> in your collection. 
                <br/>Have a look at the books that I have to exchange!</p>);
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
            <div class="container conversation">
                <div class={sender=="You"?"right":"left"}>
                <h4>{sender}</h4>{requestInit(this.props.info.receiver.bookName)}</div>
                
                {!this.props.info.sender.bookName&&this.props.info.declined&&(<div class={receiver=="You"?"right":null}>
                <h4>{receiver}</h4>
                {reqeustDecline()}
                </div>)}
               
                {this.props.info.sender.bookName&&(<div class={receiver=="You"?"right":null}>
                <h4>{receiver}</h4>
                {requestRes(this.props.info.sender.bookName)}
                </div>)}
                
                {this.props.info.sender.bookName&&this.props.info.confirmed&&(<div class={sender=="You"?"right":null}>
                <h4>{sender}</h4>
                {requestConfirm()}
                </div>)}
                
                {this.props.info.sender.bookName&&this.props.info.declined&&(<div class={sender=="You"?"right":null}>
                <h4>{sender}</h4>
                {reqeustDecline()}
                </div>)}
                
                {sender=="You"?
                (<div class="usercontrol">
                    {!this.props.info.sender.bookName&&!this.props.info.declined&&(
                    <div>{instructWaint(this.props.info.receiver.username)}</div>)}
                    {this.props.info.sender.bookName&&!this.props.info.confirmed&&!this.props.info.declined&&(
                    <div>Do you want to accept this exchange?
                    <button class="btn" onClick={this.confirmTrade.bind(this)}>Accept request</button>
                    <button class="btn" onClick={this.declineTrade.bind(this)}>Decline request</button>
                    <button class="btn"><Link to="/profile">Decide later</Link></button>
                    </div>)}
                    {this.props.info.sender.bookName&&this.props.info.confirmed&&(
                    <div><p>The exchange has concluded. You can contact user at email to arrange meetup</p>
                    </div>)}
                    {this.props.info.declined&&(
                    <div><p>The exchange has ended without success.</p>
                    </div>)}
                </div>):
                (<div class="usercontrol">
                    {!this.props.info.sender.bookName&&!this.props.info.declined&&(
                    <div>Here's what {this.props.info.sender.username} has to offer, choose a book to trade
                        {this.props.senderbooks.map((book,i)=>(
                            <div key={i} style={{cursor:"pointer"}}onClick={()=> this.viewBooks(book)}>{book.title}</div>
                        ))}
                    <button class="btn" onClick={this.declineTrade.bind(this)}>Decline request</button>
                    <button class="btn"><Link to="/profile">Decide later</Link></button>
                    </div>)}
                    {this.props.info.sender.bookName&&!this.props.info.confirmed&&!this.props.info.declined&&(<div>
                    {instructWaint(this.props.info.sender.username)}
                    </div>)}
                    
                    {this.props.info.sender.bookName&&this.props.info.confirmed&&(
                    <div><p>The exchange has concluded. You can contact user at email to arrange meetup</p>
                    </div>)}
                    {this.props.info.declined&&(
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
