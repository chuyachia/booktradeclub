import React from 'react';

var OwnerItem = ({owner,location,demander,existrequests,bookid,booktitle,email,onClick})=> {
    var clickHandle = ()=>onClick(demander,owner,bookid,booktitle,email);
    return (
        <tr>
          <td>{owner}</td>
          <td>{location}</td>
          <td>
          {owner!==demander?
            existrequests.indexOf(owner)==-1?
              (<button class="btn btn-raised bg-dark text-light" onClick={clickHandle}>Request</button>):
              (<button class="btn" disabled>Already requested</button>)
              :null
          }</td>
        </tr>    
    );
};

export default OwnerItem;