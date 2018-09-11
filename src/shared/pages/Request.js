import axios from "axios";
import Alert from "../components/Alert";
import {connect} from "react-redux";
import Footer from "../components/Footer";
import { Link } from 'react-router-dom';
import Modal from "../components/Modal";
import React from 'react';
import {viewBook} from "../actions/bookAction";
import {addExchange,confirmTrade,declineTrade,viewRequest,getSenderBooks} from "../actions/requestAction";
import styles from "../css/Request.css";

class Request extends React.Component{
    constructor(){
        super();
        this.state={
            alertopen:true,
            unauthorized:false
        };
        this.viewBooksInfo = this.viewBooksInfo.bind(this);
        this.confirmTrade = this.confirmTrade.bind(this);
        this.declineExchange = this.declineExchange.bind(this);
        this.declineTrade = this.declineTrade.bind(this);
        this.viewBooksExchange = this.viewBooksExchange.bind(this);
        this.addExchange = this.addExchange.bind(this);
        
    }
    componentDidMount(){
        var request = this.props.inrequests.concat(this.props.outrequests).filter(request=>
           request._id==this.props.match.params.id);
        if (request.length==1) {
            request = request[0];
            var role = request.receiver.username==this.props.username?'receiver':'sender';
            var unread = role =='receiver'?request.receiver.unread:request.sender.unread;
            this.props.dispatch(viewRequest(request,role,unread));
            if (role=="receiver") {
                this.props.dispatch(getSenderBooks(request.sender.username));
            }
        } else {
            this.setState({unauthorized:true});
        }
    }
    viewBooksExchange(bookinfo){
        this.props.dispatch(viewBook(bookinfo,"answersender"));
    }
    viewBooksInfo(bookid){
        axios.get('/books/info/'+bookid)
        .then(response=>{
            if(response.data)
                this.props.dispatch(viewBook(response.data,"info"));
        })
        .catch(err=>console.log(err))
    }
    addExchange(bookid,bookname){
        this.props.dispatch(addExchange(bookid,bookname,this.props.info._id,this.props.email));
    }
    confirmTrade(){
        this.props.dispatch(confirmTrade(this.props.info._id));
    }
    declineTrade(){
        this.props.dispatch(declineTrade(this.props.info._id,"sender"));
    }
    declineExchange(){
        this.props.dispatch(declineTrade(this.props.info._id,"receiver"));
    }
    closeAlert(){
        this.props.dispatch({type:"ALERT_CLOSE"});
    }
    render(){
        function requestInit(book,id,func){
            return (<p>I'm interested in the book <strong style={{cursor:'pointer'}} onClick={()=>func(id)}>"{book}"</strong> in your collection. Have a look at the books that I have for exchange!</p>);
        }
        function requestRes(book,id,func){
            return (<p>I would accept to exchange my book with your <strong style={{cursor:'pointer'}} onClick={()=>func(id)}>" {book} "</strong>.</p>);
        }
        function requestConfirm(){
            return (<p>OK! That's call it a deal.</p>);
        }
        function instructWaint(name){
            return (<p>Waiting for {name}'s response.</p>);
        }
        function reqeustDecline(){
            return(<p>Sorry, I'm not interested.</p>);
        }

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
                        {requestInit(this.props.info.receiver.bookName,this.props.info.receiver.bookId,this.viewBooksInfo)}
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
                        {requestRes(this.props.info.sender.bookName,this.props.info.sender.bookId,this.viewBooksInfo)}
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
                (<div class={`${styles.box} bg-light text-dark`}>
                    {!this.props.info.sender.bookName&&this.props.info.status=="pending"&&(
                    <div>{instructWaint(this.props.info.receiver.username)}</div>)}
                    
                    {this.props.info.sender.bookName&&this.props.info.status=="pending"&&(
                    <div>Do you want to accept this exchange?
                    <div>
                        <button class="btn btn-raised" onClick={this.confirmTrade}>Accept request</button>
                        <button class="btn btn-raised" onClick={this.declineExchange}>Decline request</button>
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
                        <ul class={`${styles.scroll} list-unstyled`}>{this.props.senderbooks.map(book=>(
                            <li key={book._id} style={{cursor:"pointer"}} onClick={()=> this.viewBooksExchange(book)}>
                            <strong>{book.title}</strong></li>
                        ))}</ul>
                    <div>
                        <button class="btn btn-raised" onClick={this.declineTrade}>Decline request</button>
                        <Link class="btn btn-raised" to="/profile">Decide later</Link>
                    </div>
                    </div>)}
                    
                    {this.props.info.sender.bookName&&this.props.info.status=="pending"&&(<div>
                    {instructWaint(this.props.info.sender.username)}
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
                <Modal addexchange={this.addExchange}/>
                <Footer/>
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
        inrequests : store.userinfo.inrequests,
        outrequests :store.userinfo.outrequests,
        email:store.userinfo.email
    };
};

export default connect(propsMap)(Request);
