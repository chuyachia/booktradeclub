import BookCard from "../../components/BookCard";
import { connect } from "react-redux";
import filter from "lodash.filter";
import Footer from "../../components/Footer";
import {getAllBooks} from "../../actions/bookAction";
import Modal from "../../components/Modal";
import NavBar from "../../components/NavBar";
import React from "react";
import { SyncLoader } from 'react-spinners';
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
            this.props.dispatch(getAllBooks());
    }
    render(){
        var books = filter(this.props.books,(book)=>book.title.toLowerCase().indexOf(this.state.term)>-1);
        return (
         <div class="container">
            <NavBar/>
            <h1 class="display-4">Books for exchange</h1>
            <input class="searchbook" onChange={this.addSearchTerm.bind(this)} type="search" class="form-control" autoFocus
            placeholder="Enter a book name"/>
            <div class="spinner-wrap">
                <SyncLoader
                  color={'#424242'} 
                  loading={this.props.loading} 
                />
            </div>
            {this.props.error&&<p>Oops, something went wrong. Please come back later.</p>}
            {books.map((book,i)=> (
                <BookCard key={i} info={book} modaluse="addrequest"/>
                ))}
            <Modal/>
            <Footer/>
            </div>);
    }
}


var propsMap = (store)=>{
    return {
        loading:store.queries.loading,
        books : store.queries.books,
        error : store.queries.error,
        username : store.userinfo.username
    };
};

export default connect(propsMap)(Main);
