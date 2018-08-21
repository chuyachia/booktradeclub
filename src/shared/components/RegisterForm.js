import {AsyncTypeahead} from "react-bootstrap-typeahead";
import {addUser} from "../actions/userAction";
import axios from "axios";
import {cancelLogin} from "../actions/connectAction";
import {connect} from "react-redux";
import React from "react";
import {Link } from "react-router-dom";


const getlocapi = "https://cors-anywhere.herokuapp.com/http://gd.geobytes.com/AutoCompleteCity?q=";


class RegisterForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            location:'',
            isLoading:false
        };
    }
    submitRegister(event){
        event.preventDefault();
        this.props.dispatch(addUser({
            username:this.state.username,
            password:this.state.password,
            email:this.state.email,
            location:this.state.location
        }));
    }
    cancelLogin(){
     this.props.dispatch(cancelLogin());
    }
    render(){
        if (!this.props.registered){
            return(<form onSubmit={this.submitRegister.bind(this)}>
                        <div class="form-group">
                            <label for="username">Username</label>
                            <input type="text" class="form-control" id="username" name="username" placeholder="Username"
                            autoComplete="off" required autoFocus
                            onChange={(event) => {
                              this.setState({username:event.target.value});
                            }}/>
                        </div>
                        <div class="form-group">
                            <label for="email">Email address</label>
                            <input type="email" class="form-control" id="email" name ="email" placeholder="Email" 
                            autoComplete="off" required
                            onChange={(event) => {
                              this.setState({email:event.target.value});
                            }}/>
                            <small class="form-text text-muted">We will only share it with people with whom you have concluded a book exchange.</small>
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" class="form-control" id="password" name="password" placeholder="Password"
                            autoComplete="off"  required
                            pattern=".{6,}" 
                            onChange={(event) => {
                              this.setState({password:event.target.value});
                            }}/>
                            {this.state.password&&this.state.password.length<6&&(
                            <div style={{color:"red"}}>Password needs to have at least 6 characters</div>
                            )}
                        </div>
                        <div class="form-group">
                         <label for="location">Location</label>
                          <AsyncTypeahead
                            isLoading={this.state.isLoading}
                            minLength={3}
                            onSearch={query => {
                              this.setState({isLoading: true});
                              axios(getlocapi+query)
                                .then(response => response.data)
                                .then(data => this.setState({
                                  isLoading: false,
                                  options: data,
                                }));
                            }}
                            onChange={(location) => {
                              this.setState({location:location[0]});
                            }}
                            options={this.state.options}
                            placeholder="Enter your city"
                            inputProps= {{name:"location",id:"location",required:true}}
                          />
                          <small class="form-text text-muted">It's important to indicate your real location so that people near you will make a request to you.</small>
                          </div>
                        <button type="submit" class="btn btn-raised bg-dark text-light">Sign up</button>
                        <Link class="btn btn-secondary" onClick = {this.cancelLogin.bind(this)} to="/">Cancel</Link>
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

var propsMap = (store)=>{
    return {
        registered:store.register.registered,
        result : store.register.result
    };
};

export default connect(propsMap)(RegisterForm);
