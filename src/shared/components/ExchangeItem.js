import React from 'react';

class ExchangeItem extends React.Component {
     clickHandle = ()=>this.props.onClick(this.props.book,"answersender");
     render(){
        return (
            <li style={{cursor:"pointer"}} onClick={this.clickHandle}>
            <strong>{this.props.book.title}</strong>
            </li>
        )  
     }
}


export default ExchangeItem;