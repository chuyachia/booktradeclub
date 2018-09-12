import {addUser} from "../actions/userAction";
import {cancelLogin} from "../actions/connectAction";
import {connect} from "react-redux";
import React from "react";
import {Link } from "react-router-dom";
import { GoogleApiWrapper} from 'google-maps-react';

class RegisterForm extends React.Component{
    constructor(){
        super();
        this.state={
            username:'',
            email:'',
            password:'',
            location:''
        };
    }
    componentDidMount(){
        const { google } = this.props;
        var input = document.getElementById('location');
        const autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.addListener('place_changed', ()=> {
            this.setState({location:autocomplete.getPlace().formatted_address});
        });        
    }
    componentDidUpdate(prevProps){
        if(prevProps.registered&&!this.props.registered) {
            const { google } = this.props;
            var input = document.getElementById('location');
            const autocomplete = new google.maps.places.Autocomplete(input);
            autocomplete.addListener('place_changed', ()=> {
                this.setState({location:autocomplete.getPlace().formatted_address});
            });
        }
    }
    submitRegister = (event)=>{
        event.preventDefault();
        this.props.addUser({
            username:this.state.username,
            password:this.state.password,
            email:this.state.email,
            location:this.state.location
        });
    }
    changeUsername = (event)=>{
        this.setState({username:event.target.value});
    }
    changePassword = (event)=>{
        this.setState({password:event.target.value});
    }
    changeEmail = (event)=>{
        this.setState({email:event.target.value});
    }
    changeLocation = (event)=>{
        this.setState({location:event.target.value});
    }
    render(){
        if (!this.props.registered){
            return(<form onSubmit={this.submitRegister}>
                        <div class="form-group">
                            <label for="username">Username</label>
                            <input type="text" class="form-control" id="username" name="username" placeholder="Username"
                            autoComplete="off" required autoFocus value = {this.state.username}
                            onChange={this.changeUsername}/>
                        </div>
                        <div class="form-group">
                            <label for="email">Email address</label>
                            <input type="email" class="form-control" id="email" name ="email" placeholder="Email" 
                            autoComplete="off" required value = {this.state.email}
                            onChange={this.changeEmail}/>
                            <small class="form-text text-muted">We will only share it with people with whom you have concluded a book exchange.</small>
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" class="form-control" id="password" name="password" placeholder="Password"
                            autoComplete="off"  required value = {this.state.password}
                            pattern=".{6,}" 
                            onChange={this.changePassword}/>
                            {this.state.password&&this.state.password.length<6&&(
                            <div style={{color:"red"}}>Password needs to have at least 6 characters</div>
                            )}
                        </div>
                        <div class="form-group">
                         <label for="location">Location</label>
                          <input type="text" class="form-control" placeholder="Enter your city"  id="location" required
                          value = {this.state.location}
                          onChange={this.changeLocation}/>
                          <small class="form-text text-muted">It's important to indicate your real location so that people near you will make a request to you.</small>
                          </div>
                        <button type="submit" class="btn btn-raised bg-dark text-light">Sign up</button>
                        <Link class="btn btn-secondary" onClick = {this.props.cancelLogin} to="/">Cancel</Link>
                    </form>
            );
        } else {
                switch(this.props.result){
                    case "success":{
                        return <div>Registered with success. Redirecting to the main page...</div>;
                    }
                    case "duplicated":{
                        return <div>Username already existed. Please try again. Redirecting back...</div>;
                    }
                    default :{
                        return <div>Something went wrong. Please try again. Redirecting back...</div>;
                    }
                }
        }
    }
}

var dispatchMap = {cancelLogin,addUser};

var propsMap = (store)=>{
    return {
        registered:store.register.registered,
        result : store.register.result
    };
};

export default connect(propsMap,dispatchMap)(GoogleApiWrapper({
  apiKey: ('AIzaSyCpnZV3MwYpso0pT3Bb8Nr9TqVh1EGR5Jc'),
  libraries:['places']
})(RegisterForm));
