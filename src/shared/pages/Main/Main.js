// Add books in Search cause Main render loop

import BookCard from "../../components/BookCard";
import { connect } from "react-redux";
import filter from "lodash.filter";
import {getAllBooks} from "../../actions/mainAction";
import { Link } from 'react-router-dom'
import Modal from "../../components/Modal"
import React from "react";

class Main extends React.Component {
    constructor(){
        super();
        this.state={term:''};
    }
    addSearchTerm(event){
        this.setState({term: event.target.value});
    }
    componentWillMount(){
        if (this.props.books.length==0){
            this.props.dispatch(getAllBooks());
        }
    }
    render(){
        var books = filter(this.props.books,(book)=>book.title.toLowerCase().indexOf(this.state.term)>-1);
        return (
        <div>
        {this.props.username&&<div>Hi, {this.props.username}</div>}
        {this.props.username?<a href="/logout">Logout</a>:<Link to="/connect">Login</Link>}
        {this.props.username&&<Link to="/profile">Profile</Link>}
        <input onChange={this.addSearchTerm.bind(this)} type="search" class="form-control" placeholder="Enter a book name"/>
        {books.map((book,i)=> (
            <BookCard key={i} info={book}/>
            ))}
        <Modal btnuse="addrequest"/>
        </div>);
    }
}


var propsMap = (store)=>{
    return {
        books : store.queries.books,
        error : store.queries.error,
        username : store.userinfo.username
    };
};

export default connect(propsMap)(Main);
