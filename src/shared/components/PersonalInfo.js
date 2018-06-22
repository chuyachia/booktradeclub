import {AsyncTypeahead} from "react-bootstrap-typeahead";
import axios from "axios";
import {changeEmail,changeLocation,changePassword,cancelChange,submitChange} from "../actions/userAction";
import {connect} from "react-redux";
import React from 'react';
import styles from '../css/PersonalInfo.css';

const getlocapi = "https://cors-anywhere.herokuapp.com/http://gd.geobytes.com/AutoCompleteCity?q=";

class PersonalInfo extends React.Component{
    constructor(){
        super();
        this.state={
            email:'',
            location:'',
            oldpassword:'',
            newpassword:'',
            isLoading:false
        }
    }
    changeEmail(){
        this.props.dispatch(changeEmail());
    }
    changeLocation(){
        this.props.dispatch(changeLocation());
    }
    changePassword(){
        this.props.dispatch(changePassword());
    }
    cancelChange(){
        this.props.dispatch(cancelChange());
    }
    submitChange(target){
        switch(target){
        case "email":
            this.props.dispatch(submitChange(this.props.username,target,this.state.email));
            break;
        case "location":
            this.props.dispatch(submitChange(this.props.username,target,this.state.location));
            break;
        case "password":
            var pwpair ={oldpassword:this.state.oldpassword,newpassword:this.state.newpassword};
            this.props.dispatch(submitChange(this.props.username,target,pwpair));
            break;
        default:
            break;
        }
    }
    render(){
        return(
            <div class={`${styles.largeLineHeight}`}>
                <h3 class="text-center">{this.props.username}</h3>
                <div>
                <label for="passwordold"><strong>Password&nbsp;</strong></label>
                <span>
                <button class={`${styles.button}`} onClick={this.changePassword.bind(this)}><i class="fas fa-edit"></i></button>
                {this.props.changedsucess&&(<p><i>Successfully changed</i></p>)}
                </span>
                {this.props.editpassword
                ?(
                    <form onSubmit={(event)=>{
                    event.preventDefault();
                    this.submitChange("password");
                    }}>
                     <input type="password" placeholder="Old password" id="oldpassword" name ="oldpassword" class="form-control" required
                     onChange={(event) => {
                              this.setState({oldpassword:event.target.value});
                            }}/>
                     <input type="password" placeholder="New password" id="newpassword" name ="newpassword" class="form-control" required
                     pattern=".{6,}" 
                     onChange={(event) => {
                              this.setState({newpassword:event.target.value});
                            }}/>
                    {this.state.newpassword&&this.state.newpassword.length<6&&(
                        <div style={{color:"red"}}>Password needs to have at least 6 characters</div>
                    )}
                    {this.props.psunmatch&&(
                        <div style={{color:"red"}}>Old password does not match</div>
                    )}
                     <button type="submit" class={`${styles.button}`}><i class="fas fa-check"></i></button>
                     <button type="button" class={`${styles.button}`} onClick={this.cancelChange.bind(this)}><i class="fas fa-times"></i></button>
                     </form>
                )
                :null
                }
                </div>
                <div>
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
                     <button type="submit" class={`${styles.button}`}><i class="fas fa-check"></i></button>
                     <button type="button" class={`${styles.button}`} onClick={this.cancelChange.bind(this)}><i class="fas fa-times"></i></button>
                     </form>
                )
                :(<span>{this.props.location}
                <button class={`${styles.button}`} onClick={this.changeLocation.bind(this)}><i class="fas fa-edit"></i></button>
                </span>)
                }
                </div>
                <div>
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
                     <button type="submit" class={`${styles.button}`}><i class="fas fa-check"></i></button>
                     <button type="button" class={`${styles.button}`} onClick={this.cancelChange.bind(this)}><i class="fas fa-times"></i></button>
                     </form>
                    
                )
                :(<span>{this.props.email}
                <button class={`${styles.button}`}  onClick={this.changeEmail.bind(this)}><i class="fas fa-edit"></i></button>
                </span>)
                }</div>
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
        editlocation:store.setting.editlocation,
        editpassword:store.setting.editpassword,
        psunmatch:store.setting.psunmatch,
        changedsucess:store.setting.changedsucess
    };
};

export default connect(propsMap)(PersonalInfo);
