import { Link } from 'react-router-dom';
import React from 'react';

var RequestItem = ({request,type,onClick})=>{
    var tradeStatus = (status)=>{
        switch(status){
            case "pending":
               return (<span class="badge badge-secondary">Pending</span>);
            case "confirmed":
               return (<span class="badge badge-success">Confirmed</span>);
            case "declined":
                return (<span class="badge badge-light">Declined</span>);
        }
    }
    var handleClick = ()=>onClick(request._id);
    if (type == 'incoming') {
        return (
            <li>
                <Link to={"/request/"+request._id}>{request.sender.username} requested your <em>{request.receiver.bookName}</em></Link>
                &nbsp;{tradeStatus(request.status)}&nbsp;
                {request.receiver.unread&&<span class="badge badge-pill badge-warning">New</span>}
            &nbsp;<i class="fas fa-trash" style={{cursor:"pointer"}} onClick={handleClick}/>&nbsp;
            </li>
            );
    } else if (type == 'outgoing') {
        return (
            <li>
                <Link to={"/request/"+request._id}>
                You requested {request.receiver.username}'s <em>{request.receiver.bookName}</em></Link>
                &nbsp;{tradeStatus(request.status)}&nbsp;
                {request.sender.unread&&<span class="badge badge-pill badge-warning">New</span>}
                &nbsp;<i class="fas fa-trash" style={{cursor:"pointer"}} onClick={handleClick}/>&nbsp;
            </li>        
            );
    } else {
        return null;
    }
};

export default RequestItem;