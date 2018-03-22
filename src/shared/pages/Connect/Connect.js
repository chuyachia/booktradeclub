// Take care of register form redirect
import LoginForm from "../../components/LoginForm";
import React from "react";
import RegisterForm from "../../components/RegisterForm"
import "./Connect.css";

class Connect extends React.Component{
    constructor(){
        super()
        this.state={
            choice:"login"
        }
    }
    changePage(target){
        this.setState({choice:target});
    }
    render(){
        var underline={ textDecoration: "underline"};
        return(
        <div class="row">
            <div class="col-md-6 connect"><span style={this.state.choice=="login"?underline:null} onClick={()=>this.changePage("login")}>Log in</span></div>
            <div class="col-md-6 connect"><span style={this.state.choice=="signup"?underline:null} onClick={()=>this.changePage("signup")}>Sign up</span></div>
            <div class="col-md-12">{this.state.choice=="login"?<LoginForm/>:<RegisterForm/>}</div>
        </div>
        )
    }
}

export default Connect;
