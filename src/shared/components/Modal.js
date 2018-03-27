import {addBook,closeBook,removeBook} from "../actions/profileAction";
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
    removeBook(){
        this.props.dispatch(removeBook(this.props.info.bookId,this.props.username));
    }
    addRequest(indx){
        var receiver = this.props.info.ownBy[indx];
        this.props.dispatch(addRequest(this.props.username,receiver,this.props.info.bookId,this.props.info.title,this.props.email));
    }
    componentWillReceiveProps(nextProps){
        if (nextProps.btnuse=="addrequest"&&nextProps.info.ownBy&&nextProps.info!=this.props.info){
            this.props.dispatch(getUsersLocation(nextProps.info.ownBy));
        }
    }
    render(){
        var modalStyles = {overlay: {zIndex: 10}};
        if (this.props.tologin){
            return(<Redirect to={{
            pathname: "/connect"
          }}/>);
        } else {
            var ownedbooks = this.props.ownedbooks.map(book=>book.bookId);
            var outrequests = this.props.outrequests.filter(request=>request.receiver.bookId==this.props.info.bookId&&request.status!="declined");
            var outrequser = outrequests.map(request=>request.receiver.username);
            return(
            <ReactModal style={modalStyles}
               isOpen={this.props.open}
               ariaHideApp={false}
               contentLabel="Review Modal">
              <a class="text-dark" style={{float:"right",cursor:"pointer"}}><i class="fas fa-times" onClick={this.closeBook.bind(this)}/></a>
               <h3>{this.props.info.title}</h3>
               <dl>
                    <dt><img src={this.props.info.imageUrl} alt={this.props.info.title} class="img-thumbnail"/></dt>
               {this.props.info.authors&&
               (<div>
                    <dt>Author</dt>
                    <dd>{this.props.info.authors.map((author)=> author)}</dd>
                </div>)}
                    <dt>Publisher</dt>
                    <dd>{this.props.info.publisher}</dd>
                    <dt>Published</dt>
                    <dd>{this.props.info.publishedDate}</dd>

                    <dd>{this.props.info.description}</dd>
               </dl>
               
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
                      <td>
                      {user!==this.props.username
                        ?outrequser.indexOf(user)==-1?
                          (<button class="btn btn-raised bg-dark text-light" onClick={()=>{this.addRequest(i)}}>Request</button>):
                          (<button class="btn" disabled>Already requested</button>)
                          :null
                      }</td>
                    </tr>
                    ))}
                  </tbody>
                </table></div>}
                
               {this.props.btnuse=="addbook"&&(ownedbooks.indexOf(this.props.info.bookId)==-1
                    ?<button class="btn btn-raised bg-dark text-light" onClick={this.addBook.bind(this)}>Add to my books</button>
                    :<button class="btn" disabled>Already added</button>)
               }
               
               {this.props.btnuse =="answersender"&&
               (<button class="btn btn-raised bg-dark text-light" onClick={()=>this.props.addexchange(this.props.info.bookId,this.props.info.title)}>Exchange</button>)}
                
                {this.props.btnuse =="removebook"&&
               (<button class="btn btn-raised bg-dark text-light" onClick={this.removeBook.bind(this)}>Remove from my books</button>)}
                
                </ReactModal>
            );
        }
    }
}
var propsMap = (store)=>{
    return{
        btnuse: store.viewbook.btnuse,
        tologin:store.viewbook.tologin,
        open:store.viewbook.open,
        info:store.viewbook.info,
        username : store.userinfo.username,
        email:store.userinfo.email,
        ownedbooks:store.userinfo.ownedbooks,
        outrequests:store.userinfo.outrequests,
        ownerslocation:store.viewbook.ownerslocation
    };
};

export default connect(propsMap)(Modal);