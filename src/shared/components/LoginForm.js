import Alert from "./Alert";
import {connect} from "react-redux";
import {logIn,cancelLogin} from "../actions/connectAction";
import React from "react";
import {Link } from "react-router-dom";

class LoginForm extends React.Component{
    constructor(){
        super();
        this.state={
            username:'',
            password:'',
            disabled:false
        };
    }
    componentWillReceiveProps(nextProp){
        if(nextProp.wrongcredential){
            this.refs.password.value = '';
            this.setState({
                password:''
            });
        }
    }
    logIn = (event) => {
        event.preventDefault();
        this.setState({disabled:true});
        this.props.logIn(this.state.username,this.state.password);
    }
    changeUsername = (event)=>{
        
        this.setState({username:event.target.value});
    }
    changePassword = (event)=>{
        this.setState({password:event.target.value});
    }

    render(){
    if (!this.props.username){
                return(
                <div>
                <Alert/>
                <form onSubmit={this.logIn}>
                    <div class="form-group">
                        <label for="username">Username</label>
                        <input type="text" class="form-control" id="username" name="username" placeholder="Username" required autoFocus
                        onChange={this.changeUsername}/>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" class="form-control" id="password" name="password" placeholder="Password" required
                        ref="password" autoComplete="off"
                        onChange={this.changePassword}/>
                    </div>
                    {(this.props.wrongcredential&&this.state.password.length==0)&&<div>Wrong username or password! Try again</div>}
                    <button type="submit" class="btn btn-raised bg-dark text-light" disabled={this.state.disabled}>Log in</button>
                    <Link class="btn btn-secondary" onClick = {this.props.cancelLogin} to="/">Cancel</Link>
                </form>
                </div>
                )
        } else {
            return <div>Successfully logged in. Redirecting...</div>
        }
    }
}

var dispatchMap = {logIn,cancelLogin};

var propsMap = (store)=>{
    return {
        wrongcredential:store.userinfo.wrongcredential,
        username : store.userinfo.username
    };
};

export default connect(propsMap,dispatchMap)(LoginForm);

