// records books own only in books model and aggregate to show all books own by a user in profile

import {connect} from "react-redux";
import React from "react";
import {viewBook} from "../actions/profileAction";

class BookCard extends React.Component{
    constructor(props){
        super(props);
    }
    viewBooks(){
        this.props.dispatch(viewBook(this.props.info,this.props.modaluse));
    }
    render(){
        return(
            <div class="card bookdisplay" onClick={this.viewBooks.bind(this)}>
                <img src={this.props.info.imageUrl} alt={this.props.info.title} class="img-thumbnail"/>
                  <div class="middle">
                    <i class="fas fa-search fa-lg"></i>
                </div>
            </div>
            );
    }
}

export default connect()(BookCard);