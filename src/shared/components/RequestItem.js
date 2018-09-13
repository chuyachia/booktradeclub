import { Link } from 'react-router-dom';
import React from 'react';

class RequestItem extends React.Component {
    tradeStatus = (status)=>{
        switch(status){
            case "pending":
               return (<span class="badge badge-secondary">Pending</span>);
            case "confirmed":
               return (<span class="badge badge-success">Confirmed</span>);
            case "declined":
                return (<span class="badge badge-light">Declined</span>);
        }
    }   
    handleClick = ()=>this.props.onClick(this.props.request._id);
    render(){
        if (this.props.type == 'incoming') {
            return (
                <li>
                    <Link to={"/request/"+this.props.request._id}>{this.props.request.sender.username} requested your 
                        <em>&nbsp;{this.props.request.receiver.bookName}&nbsp;</em>
                    </Link>
                    &nbsp;{this.tradeStatus(this.props.request.status)}&nbsp;
                    {this.props.request.receiver.unread&&<span class="badge badge-pill badge-warning">New</span>}
                &nbsp;<i class="fas fa-trash" style={{cursor:"pointer"}} onClick={this.handleClick}/>&nbsp;
                </li>
                );
        } else if (this.props.type == 'outgoing') {
            return (
                <li>
                    <Link to={"/request/"+this.props.request._id}>You requested {this.props.request.receiver.username}'s
                    <em>&nbsp;{this.props.request.receiver.bookName}&nbsp;</em>
                    </Link>
                    &nbsp;{this.tradeStatus(this.props.request.status)}&nbsp;
                    {this.props.request.sender.unread&&<span class="badge badge-pill badge-warning">New</span>}
                    &nbsp;<i class="fas fa-trash" style={{cursor:"pointer"}} onClick={this.handleClick}/>&nbsp;
                </li>        
                );
        } else {
            return null;
        }        
    }
    
}


export default RequestItem;