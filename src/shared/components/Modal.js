import {addBook,closeBook} from "../actions/profileAction";
import {connect} from "react-redux";
import {addRequest, getUsersLocation} from "../actions/mainAction";
import React from 'react';
import ReactModal from 'react-modal';
import {Redirect } from "react-router-dom";


class Modal extends React.Component{
    constructor(props){
        super(props);
    }
    closeBook(){
        this.props.dispatch(closeBook());
    }
    addBook(){
        this.props.dispatch(addBook(this.props.info,this.props.username));
    }
    addRequest(indx){
        var receiver = this.props.info.ownBy[indx];
        this.props.dispatch(addRequest(this.props.username,receiver,this.props.info.bookId,this.props.info.title))
    }
    componentWillReceiveProps(nextProps){
        if (nextProps.info.ownBy&&nextProps.info!=this.props.info){
            this.props.dispatch(getUsersLocation(nextProps.info.ownBy));
        }
    }
    render(){
        var modalStyles = {overlay: {zIndex: 10}};
        if (this.props.tologin){
            return(<Redirect to={{
            pathname: "/connect"
          }}/>)
        } else {
        return(
        <ReactModal style={modalStyles}
           isOpen={this.props.open}
           ariaHideApp={false}
           contentLabel="Review Modal">
          <a style={{float:"right",cursor:"pointer"}}><i class="fas fa-times" onClick={this.closeBook.bind(this)}/></a>
           <h3>{this.props.info.title}</h3>
           <ul class="list-unstyled">
           <li><img src={this.props.info.imageUrl} alt={this.props.info.title} class="img-thumbnail"/></li>
           {this.props.info.authors&&
           (<li>Author: {this.props.info.authors.map((author)=> author)}</li>)}
           <li>Publisher : {this.props.info.publisher}</li>
           <li>Date : {this.props.info.publishedDate}</li>
           {this.props.info.categories&&
           (<li>Category : {this.props.info.categories.map((cat)=>cat)}</li>)}
           <li>{this.props.info.description}</li>
           </ul>
           
           {this.props.btnuse=="addrequest"&&this.props.ownerslocation&&
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
                {this.props.info.ownBy.map((user,i)=>(
                <tr key={i}>
                  <td>{user}</td>
                  <td>{this.props.ownerslocation[i]}</td>
                  <td><button class="btn" onClick={()=>{this.addRequest(i)}}>Request</button></td>
                </tr>
                ))}
              </tbody>
            </table></div>}
            
           {this.props.btnuse=="addbook"&&(this.props.ownedbooks.indexOf(this.props.info.bookId)==-1
                ?<button class="btn" onClick={this.addBook.bind(this)}>Add to my books</button>
                :<button class="btn" disabled>Already added</button>)
           }
           
           {this.props.btnuse =="answersender"&&
           (<button class="btn" onClick={()=>this.props.addexchange(this.props.info.bookId,this.props.info.title)}>Exchange</button>)}
        </ReactModal>
        );
        }
    }
}
var propsMap = (store)=>{
    return{
        tologin:store.viewbook.tologin,
        open:store.viewbook.open,
        info:store.viewbook.info,
        username : store.userinfo.username,
        ownedbooks:store.userinfo.ownedbooks,
        warning:store.viewbook.warning,
        ownerslocation:store.viewbook.ownerslocation
    };
};

export default connect(propsMap)(Modal);