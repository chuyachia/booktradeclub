import BookCard from "../components/BookCard";
import { connect } from "react-redux";
import filter from "lodash.filter";
import Footer from "../components/Footer";
import {getAllBooks} from "../actions/bookAction";
import Modal from "../components/Modal";
import NavBar from "../components/NavBar";
import React from "react";
import { SyncLoader } from 'react-spinners';
import styles from "../css/Main.css";




class Main extends React.Component {
    constructor(){
        super();
        this.state={term:''};
        this.addSearchTerm = this.addSearchTerm.bind(this);
    }
    addSearchTerm(event){
        this.setState({term: event.target.value});
    }
    componentDidMount(){
        this.props.getAllBooks();
    }
    render(){
        var books = filter(this.props.books,(book)=>book.title.toLowerCase().indexOf(this.state.term)>-1);
        return (
         <div class="container">
            <NavBar/>
            <h1 class="display-4">Books for exchange</h1>
            <input class="searchbook" onChange={this.addSearchTerm} type="search" class="form-control" autoFocus
            placeholder="Enter a book name"/>
            <div class={`${styles.wrap}`}>
                <SyncLoader
                  color={'#424242'} 
                  loading={this.props.loading} 
                />
            </div>
            {this.props.error&&<p>Oops, something went wrong. Please come back later.</p>}
            {books.map(book=> (
                <BookCard key={book._id} info={book} modaluse="addrequest"/>
                ))}
            <Modal/>
            <Footer/>
        </div>);
    }
}

var dispatchMap = {getAllBooks};

var propsMap = (store)=>{
    return {
        loading:store.queries.loading,
        books : store.queries.books,
        error : store.queries.error,
        username : store.userinfo.username
    };
};

export default connect(propsMap,dispatchMap)(Main);
