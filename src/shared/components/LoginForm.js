import axios from "axios";
import {connect} from "react-redux";
import {logIn} from "../actions/mainAction";
import React from "react";
import {Redirect } from "react-router-dom";

class LoginForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:''
        };
    }
    componentWillReceiveProps(nextProp){
        if(nextProp.wrongcredential){
            this.refs.password.value = '';
        }
    }
    submitLogin(event){
        event.preventDefault();
        this.props.dispatch(logIn({
            username:this.state.username,
            password:this.state.password
        }))
    }
    render(){
        return(
        <form onSubmit={this.submitLogin.bind(this)}>
        {this.props.username&&<Redirect to={{pathname:'/'}}/>}
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" class="form-control" id="username" name="username" placeholder="Username" required autoFocus
                onChange={(event) => {
                  this.setState({username:event.target.value});
                }}/>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" id="password" name="password" placeholder="Password" required
                ref="password"
                onChange={(event) => {
                  this.setState({password:event.target.value});
                }}/>
            </div>
            {this.props.wrongcredential&&<div>Wrong username or password! Try again</div>}
            <button type="submit" class="btn btn-raised bg-dark text-light">Log in</button>
        </form>
        )
    }
}

var propsMap = (store)=>{
    return {
        wrongcredential:store.userinfo.wrongcredential,
        username : store.userinfo.username,
        error:store.userinfo.error
    };
};

export default connect(propsMap)(LoginForm);

