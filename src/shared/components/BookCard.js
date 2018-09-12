import {connect} from "react-redux";
import React from "react";
import {viewBook} from "../actions/bookAction";
import styles from "../css/BookCard.css";

var BookCard = ({info,modaluse,viewBook}) => {
    var handleClick = ()=>viewBook(info,modaluse);
    return (
      <div class={`card ${styles.card}`} onClick={handleClick}>
          <img src={info.imageUrl} alt={info.title} class="img-thumbnail"/>
            <div class={`${styles.center}`}>
              <i class="fas fa-search fa-lg"></i>
          </div>
      </div>    
    );
    };
    
var dispathMap = {viewBook};

export default connect(null,dispathMap)(BookCard);