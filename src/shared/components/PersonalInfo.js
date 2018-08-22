import {changeEmail,changeLocation,changePassword,cancelChange,submitChange} from "../actions/userAction";
import {connect} from "react-redux";
import React from 'react';
import styles from '../css/PersonalInfo.css';
import { GoogleApiWrapper} from 'google-maps-react';

class PersonalInfo extends React.Component{
    constructor(){
        super();
        this.state={
            email:null,
            location:null,
            oldpassword:null,
            newpassword:null
        };
    }
    componentDidUpdate(prevProps){
        if (!prevProps.editlocation&&this.props.editlocation){
            const { google } = this.props;
            var input = document.getElementById('location');
            const autocomplete = new google.maps.places.Autocomplete(input);
            autocomplete.addListener('place_changed', ()=> {
                this.setState({location:autocomplete.getPlace().formatted_address});
            });
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
                   <input type="text" class="form-control" placeholder={this.props.location}  id="location" required
                      onChange={(event) => {
                          this.setState({location:event.target.value});
                    }}/>
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
                     <input type="email" placeholder={this.props.email} id="email" name ="email" class="form-control" required
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
            </div>);
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

export default connect(propsMap)(GoogleApiWrapper({
  apiKey: ('AIzaSyCpnZV3MwYpso0pT3Bb8Nr9TqVh1EGR5Jc'),
  libraries:['places']
})(PersonalInfo));
