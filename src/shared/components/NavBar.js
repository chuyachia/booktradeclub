import DropDownBtn from "./DropDownBtn";
import { Link } from 'react-router-dom';
import React from "react";

class NavBar extends React.Component{
    render(){
        return(
        <nav class="navbar navbar-dark bg-dark fixed-top">
          <Link class="navbar-brand" to="/">Book Trading Club</Link>
          <DropDownBtn/>
        </nav>)
    }
}

export default NavBar;