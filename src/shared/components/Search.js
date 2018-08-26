// use props.books obtained after logged in to check if searched book is already added. if yes, add book button should change
import {connect} from "react-redux";
import BookCard from "./BookCard";
import Modal from "./Modal";
import React from "react";
import {searchBooks} from "../actions/bookAction";
import { SyncLoader } from 'react-spinners';
import styles from "../css/Main.css";

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
                  <input onChange={this.addSearchTerm.bind(this)} type="search" class="form-control" autoFocus
                  placeholder="Enter a book name" required/>
                  <span class="input-group-btn">
                    <button type="submit" class="btn btn-raised bg-dark text-light">
                      <i class="fas fa-search"></i>
                    </button> 
                  </span>
                </div>
            </form>
            <div class={`${styles.wrap}`}>
                <SyncLoader
                  color={'#424242'} 
                  loading={this.props.loading} 
                />
            </div>
            {this.props.error&&<div>Oops, something went wrong. Please try with another search term.</div>}
            {!this.props.error&&this.props.books.map(book=> (
            <BookCard key={book.bookId} info={book} modaluse="addbook"/>
            ))}
        </div>
        )
    }
}

var propsMap = (store)=>{
    return {
        loading: store.searches.loading,
        books : store.searches.books,
        error : store.searches.error
    };
};

export default connect(propsMap)(Search);