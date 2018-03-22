// use props.books obtained after logged in to check if searched book is already added. if yes, add book button should change
import {connect} from "react-redux";
import BookCard from "./BookCard";
import Modal from "./Modal";
import React from "react";
import {searchBooks} from "../actions/profileAction";


class Search extends React.Component {
    constructor(){
        super();
        this.state={term:''};
    }
    addSearchTerm(event){
        this.setState({term: event.target.value});
    }
    submitSearch(event){
        event.preventDefault();
        this.props.dispatch(searchBooks(this.state.term));
    }
    render(){
        return(
        <div>
            <form onSubmit={this.submitSearch.bind(this)}>
                <div class="input-group">
                  <input onChange={this.addSearchTerm.bind(this)} type="search" class="form-control" 
                  placeholder="Enter a book name" required/>
                  <span class="input-group-btn">
                    <button type="submit" class="btn btn-primary">
                      Start
                    </button> 
                  </span>
                </div>
            </form>
            {this.props.books.map((book,i)=> (
            <BookCard key={i} info={book} modaluse="addsearch"/>
            ))}
        </div>
        )
    }
}

var propsMap = (store)=>{
    return {
        books : store.searches.books,
        error : store.searches.error
    };
};

export default connect(propsMap)(Search);