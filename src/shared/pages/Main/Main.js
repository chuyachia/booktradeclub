import BookCard from "../../components/BookCard";
import { connect } from "react-redux";
import NavBar from "../../components/NavBar"
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
         <div class="container">
            <NavBar/>
            <input class="searchbook" onChange={this.addSearchTerm.bind(this)} type="search" class="form-control" autoFocus
            placeholder="Enter a book name"/>
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
