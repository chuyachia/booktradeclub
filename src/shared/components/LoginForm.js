import Alert from "./Alert";
import {connect} from "react-redux";
import {logIn,cancelLogin} from "../actions/connectAction";
import React from "react";
import {Link } from "react-router-dom";

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
            this.setState({
                password:''
            })
        }
    }
    submitLogin(event){
        event.preventDefault();
        this.props.dispatch(logIn({
            username:this.state.username,
            password:this.state.password
        }))
    }
    cancelLogin(){
     this.props.dispatch(cancelLogin());
    }
    render(){
    if (!this.props.username){
                return(
                <div>
                <Alert/>
                <form onSubmit={this.submitLogin.bind(this)}>
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
                        ref="password" autoComplete="off"
                        onChange={(event) => {
                          this.setState({
                          password:event.target.value});
                        }}/>
                    </div>
                    {(this.props.wrongcredential&&this.state.password.length==0)&&<div>Wrong username or password! Try again</div>}
                    <button type="submit" class="btn btn-raised bg-dark text-light">Log in</button>
                    <Link class="btn btn-secondary" onClick = {this.cancelLogin.bind(this)} to="/">Cancel</Link>
                </form>
                </div>
                )
        } else {
            return <div>Successfully logged in. Redirecting...</div>
        }
    }
}

var propsMap = (store)=>{
    return {
        wrongcredential:store.userinfo.wrongcredential,
        username : store.userinfo.username
    };
};

export default connect(propsMap)(LoginForm);

