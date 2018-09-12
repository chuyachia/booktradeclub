import React from 'react';

var ExchangeItem = ({book,onClick})=>{
    var clickHandle = ()=>onClick(book,"answersender");
    return (
        <li style={{cursor:"pointer"}} onClick={clickHandle}>
            <strong>{book.title}</strong>
        </li>
    )};

export default ExchangeItem;