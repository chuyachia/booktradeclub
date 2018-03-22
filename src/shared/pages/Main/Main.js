import BookCard from "../../components/BookCard";
import { connect } from "react-redux";
import DropDownBtn from "../../components/DropDownBtn"
import filter from "lodash.filter";
import {getAllBooks} from "../../actions/mainAction";
import { Link } from 'react-router-dom';
import Modal from "../../components/Modal";
import React from "react";
import "./Main.css";

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
        <DropDownBtn/>
        {this.props.username&&<div>Hi, {this.props.username}</div>}
        <input onChange={this.addSearchTerm.bind(this)} type="search" class="form-control" placeholder="Enter a book name"/>
        {books.map((book,i)=> (
            <BookCard key={i} info={book} modaluse="addrequest"/>
            ))}
        <Modal/>
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
