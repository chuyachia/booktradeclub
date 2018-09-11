import {connect} from "react-redux";
import React from "react";
import {viewBook} from "../actions/bookAction";
import styles from "../css/BookCard.css";
import { bindActionCreators } from 'redux';

var BookCard = ({info,modaluse,viewBook}) => (
        <div class={`card ${styles.card}`} onClick={()=>viewBook(info,modaluse)}>
            <img src={info.imageUrl} alt={info.title} class="img-thumbnail"/>
              <div class={`${styles.center}`}>
                <i class="fas fa-search fa-lg"></i>
            </div>
        </div>    
    );
    
var dispathMap = (dispatch)=>bindActionCreators({viewBook},dispatch);

export default connect(null,dispathMap)(BookCard);