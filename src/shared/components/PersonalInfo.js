import {AsyncTypeahead} from "react-bootstrap-typeahead";
import axios from "axios";
import BookCard from "./BookCard";
import {changeEmail,changeLocation,cancelChange,submitChange} from "../actions/profileAction"
import {connect} from "react-redux";
import React from 'react';

const getlocapi = "https://cors-anywhere.herokuapp.com/http://gd.geobytes.com/AutoCompleteCity?q=";

class PersonalInfo extends React.Component{
    constructor(){
        super();
        this.state={
            email:'',
            location:'',
            isLoading:false
        }
    }
    changeEmail(){
        this.props.dispatch(changeEmail());
    }
    changeLocation(){
        this.props.dispatch(changeLocation());
    }
    cancelChange(){
        this.props.dispatch(cancelChange());
    }
    submitChange(target){
        var data=target=="email"?this.state.email:this.state.location;
        this.props.dispatch(submitChange(this.props.username,target,data));
    }
    render(){
        return(
            <div class="personinfo">
                <h3 class="text-center">{this.props.username}</h3>
                <label for="location"><strong>Location&nbsp;</strong></label>
                {this.props.editlocation
                ?(
                    <form style={{'display':'inline'}} onSubmit={(event)=>{
                    event.preventDefault();
                    this.submitChange("location");
                    }}>
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
                            inputProps= {{name:"location",id:"location",required:true,className:null}}
                          />
                     <button type="submit" class="iconbtn"><i class="fas fa-check"></i></button>
                     <button class="iconbtn"><i class="fas fa-times" onClick={this.cancelChange.bind(this)}></i></button>
                     </form>
                )
                :(<span>{this.props.location}
                <button class="iconbtn"><i class="fas fa-edit" onClick={this.changeLocation.bind(this)}></i></button>
                </span>)
                }
                <br/>
                <label for="email"><strong>Email&nbsp;</strong></label>
                {this.props.editemail
                ?(
                    <form style={{'display':'inline'}} class="form-inline" onSubmit={(event)=>{
                    event.preventDefault();
                    this.submitChange("email");
                        
                    }}>
                     <input type="email" placeholder="Email" id="email" name ="email" class="form-control" required
                     onChange={(event) => {
                              this.setState({email:event.target.value});
                            }}/>
                     <button type="submit" class="iconbtn"><i class="fas fa-check"></i></button>
                     <button class="iconbtn"><i class="fas fa-times" onClick={this.cancelChange.bind(this)}></i></button>
                     </form>
                    
                )
                :(<span>{this.props.email}
                <button class="iconbtn"><i class="fas fa-edit" onClick={this.changeEmail.bind(this)}></i></button>
                </span>)
                }
            </div>)
    }
}


var propsMap = (store)=>{
    return{
        username : store.userinfo.username,
        email:store.userinfo.email,
        location:store.userinfo.location,
        ownedbooks:store.userinfo.ownedbooks,
        editemail:store.setting.editemail,
        editlocation:store.setting.editlocation
    };
};

export default connect(propsMap)(PersonalInfo);
