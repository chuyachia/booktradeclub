import {connect} from "react-redux";
import { Link } from 'react-router-dom';
import React from "react";

class DropDownBtn extends React.Component{
    constructor(props){
        super(props)
        this.state={
            collapse:false
        };
    }
    changeCollapse(){
        const newState = this.state.collapse ? false : true;
        this.setState({
            collapse: newState
        });
    }
    render(){
        return(<div class="dropdown show">
          <a class="btn bg-dark text-light" role="button" id="dropdownMenuLink" onClick={this.changeCollapse.bind(this)}>
            <i class="fas fa-bars"></i>
          </a>
          <div class={this.state.collapse?"dropdown-menu dropdown-menu-right show":"dropdown-menu dropdown-menu-right"} 
          aria-labelledby="dropdownMenuLink" onClick={this.changeCollapse.bind(this)}>
            <Link class="dropdown-item" to="/">Home</Link>
            {this.props.username&&<Link class="dropdown-item" to="/profile">Profile</Link>}
            {this.props.username?<a class="dropdown-item" href="/auth/logout">Logout</a>
            :<Link class="dropdown-item" to="/connect">Login</Link>}
            <div class="dropdown-divider"></div>
            <Link class="dropdown-item" to="/about">About</Link>
          </div>
        </div>)
    }
}

var propsMap = (store)=>{
    return {
        username : store.userinfo.username
    };
};

export default connect(propsMap)(DropDownBtn);

