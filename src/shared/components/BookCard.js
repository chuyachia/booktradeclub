// records books own only in books model and aggregate to show all books own by a user in profile

import {connect} from "react-redux";
import React from "react";
import {viewBook} from "../actions/profileAction";

class BookCard extends React.Component{
    constructor(props){
        super(props);
    }
    viewBooks(){
        this.props.dispatch(viewBook(this.props.info));
    }
    render(){
        return(
            <div class="card">
                <img src={this.props.info.imageUrl} alt={this.props.info.title} class="img-thumbnail" onClick={this.viewBooks.bind(this)}/>
            </div>
            );
    }
}

export default connect()(BookCard);