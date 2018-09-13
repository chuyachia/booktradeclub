import React from 'react';

class OwnerItem extends React.Component {
  clickHandle = ()=>this.props.onClick(this.props.demander,this.props.owner,this.props.bookid,this.props.booktitle,this.props.email);
  render(){
    return(
        <tr>
          <td>{this.props.owner}</td>
          <td>{this.props.location}</td>
          <td>
          {this.props.owner!==this.props.demander?
            this.props.existrequests.indexOf(this.props.owner)==-1?
              (<button class="btn btn-raised bg-dark text-light" onClick={this.clickHandle}>Request</button>):
              (<button class="btn" disabled>Already requested</button>)
              :null
          }</td>
        </tr>      
      );
  }
}


export default OwnerItem;