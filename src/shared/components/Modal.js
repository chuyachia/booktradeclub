import Alert from "./Alert";
import RequestItem from "./RequestItem";
import {addBook,closeBook,removeBook} from "../actions/bookAction";
import {connect} from "react-redux";
import {addRequest,addExchange} from "../actions/requestAction";
import {getUsersLocation} from "../actions/userAction";
import React from 'react';
import ReactModal from 'react-modal';
import {Redirect } from "react-router-dom";


class Modal extends React.Component{
    componentWillReceiveProps(nextProps){
        if (nextProps.btnuse=="addrequest"&&nextProps.info.ownBy&&nextProps.info!==this.props.info){
            this.props.getUsersLocation(nextProps.info.ownBy);
        }
    }
    addBook = ()=>this.props.addBook(this.props.info,this.props.username)
    addExchange = ()=>this.props.addExchange(this.props.info.bookId,this.props.info.title,this.props.tradeid,this.props.email)
    removeBook = ()=>this.props.removeBook(this.props.info.bookId,this.props.username)
    renderRequestItem = (user,i)=><RequestItem key={i} owner={user} location={this.props.ownerslocation[i]} 
        demander={this.props.username} existrequests = {this.props.outrequests} bookid={this.props.info.bookId} 
        booktitle={this.props.info.title} email={this.props.email} onClick={this.props.addRequest}/>
    render(){
        if (this.props.tologin){
            return(<Redirect to={{
            pathname: "/connect"
          }}/>);
        } else {
            return(
            <ReactModal style={{overlay: {zIndex: 10}}}
               isOpen={this.props.open}
               ariaHideApp={false}
               contentLabel="Review Modal">
               <i class="fas fa-times" style={{float:"right",cursor:"pointer"}} onClick={this.props.closeBook}/>
               <Alert/>
               <h3>{this.props.info.title}</h3>
               <dl>
                    <dt><img src={this.props.info.imageUrl} alt={this.props.info.title} class="img-thumbnail"/></dt>
               {this.props.info.authors&&
               (<div>
                    <dt>Author</dt>
                    <dd>{this.props.info.authors.map((author,i)=> {
                    if (i<this.props.info.authors.length-1) {
                        return (<span key={i}>{author}, </span>);
                    } else {
                        return (<span key={i}>{author}</span>);
                    }
                    })}</dd>
                </div>)}
                    <dt>Publisher</dt>
                    <dd>{this.props.info.publisher}</dd>
                    <dt>Published</dt>
                    <dd>{this.props.info.publishedDate}</dd>

                    <dd>{this.props.info.description}</dd>
               </dl>
               
               {this.props.btnuse=="addrequest"&&
               <div>
               <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">Owner</th>
                      <th scope="col">Location</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.ownerslocation.length>0&&this.props.info.ownBy.map(this.renderRequestItem)}
                  </tbody>
                </table></div>}
                
               {this.props.btnuse=="addbook"&&(this.props.ownedbooks.indexOf(this.props.info.bookId)==-1
                    ?<button class="btn btn-raised bg-dark text-light" onClick={this.addBook}>Add to my books</button>
                    :<button class="btn" disabled>Already added</button>)
               }
               
               {this.props.btnuse =="answersender"&&
               (<button class="btn btn-raised bg-dark text-light" onClick={this.addExchange}>Exchange</button>)}
                
                {this.props.btnuse =="removebook"&&
               (<button class="btn btn-raised bg-dark text-light" onClick={this.removeBook}>Remove from my books</button>)}
                
                </ReactModal>
            );
        }
    }
}

var dispatchMap = {addBook,closeBook,removeBook,addRequest,addExchange,getUsersLocation};

var propsMap = (store)=>{
    return{
        btnuse: store.viewbook.btnuse,
        tologin:store.viewbook.tologin,
        open:store.viewbook.open,
        info:store.viewbook.info,
        username : store.userinfo.username,
        email:store.userinfo.email,
        ownedbooks:store.userinfo.ownedbooks.map(book=>book.bookId),
        outrequests:store.userinfo.outrequests.filter(request=>request.receiver.bookId==store.viewbook.info.bookId&&request.status!="declined").map(request=>request.receiver.username),
        ownerslocation:store.viewbook.ownerslocation
    };
};

export default connect(propsMap,dispatchMap)(Modal);