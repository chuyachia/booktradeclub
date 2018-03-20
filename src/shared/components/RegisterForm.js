//http://geobytes.com/free-ajax-cities-jsonp-api/
//https://www.npmjs.com/package/react-bootstrap-typeahead
// give names to typeahead input. see how value is retreive when post
import {AsyncTypeahead} from "react-bootstrap-typeahead";
import {addUser} from "../actions/profileAction";
import axios from "axios";
import {connect} from "react-redux";
import React from "react"
import {Redirect } from "react-router-dom";


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
    render(){
        if (this.props.redirect){
         return(<Redirect to={{
            pathname: this.props.redirect
          }}/>)
        } else if (!this.props.registered){
            return(<form onSubmit={this.submitRegister.bind(this)}>
                        <div class="form-group">
                            <label for="username">Username</label>
                            <input type="text" class="form-control" id="username" name="username" placeholder="Username" required
                            onChange={(event) => {
                              this.setState({username:event.target.value});
                            }}/>
                        </div>
                        <div class="form-group">
                            <label for="email">Email address</label>
                            <input type="email" class="form-control" id="email" name ="email" placeholder="Email" required
                            onChange={(event) => {
                              this.setState({email:event.target.value});
                            }}/>
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" class="form-control" id="password" name="password" placeholder="Password" required
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
                          </div>
                        <button type="submit" class="btn btn-default">Sign up</button>
                    </form>
            )
        } else {
                switch(this.props.result){
                    case "success":{
                        return <div>Registered with success. Redirecting to the main page...</div>
                    }
                    case "duplicated":{
                        return <div>Username already existed. Please try again. Redirecting back...</div>
                    }
                    default :{
                        return <div>Something went wrong. Please try again. Redirecting back...</div>
                    }
                }
        }
    }
}

var propsMap = (store)=>{
    return {
        registered:store.register.registered,
        result : store.register.result,
        redirect:store.register.redirect
    };
};

export default connect(propsMap)(RegisterForm);
