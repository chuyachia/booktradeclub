import {startChangeEmail,startChangeLocation,startChangePassword,cancelChange,submitChange} from "../actions/userAction";
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
    changePassword = (event)=>{
        event.preventDefault();
        var pwpair ={oldpassword:this.state.oldpassword,newpassword:this.state.newpassword};
        this.props.submitChange(this.props.username,"password",pwpair);        
    }
    changeEmail = (event)=>{
        event.preventDefault();
        this.props.submitChange(this.props.username,"email",this.state.email);
    }
    changeLocation = (event)=>{
        event.preventDefault();
        this.props.submitChange(this.props.username,"location",this.state.location);
    }
    handleOldPasswordChange = (event)=>{
        this.setState({oldpassword:event.target.value});
    }
    handleNewPasswordChange = (event)=>{
        this.setState({newpassword:event.target.value});
    }
    handleLocationChange = (event)=>{
        this.setState({location:event.target.value});
    }
    handleEmailChange = (event)=>{
        this.setState({email:event.target.value});
    }
    render(){
        return(
            <div class={`${styles.largeLineHeight}`}>
                <h3 class="text-center">{this.props.username}</h3>
                <div>
                <label for="passwordold"><strong>Password&nbsp;</strong></label>
                <span>
                <button class={`${styles.button}`} onClick={this.props.startChangePassword}><i class="fas fa-edit"></i></button>
                {this.props.changedsucess&&(<p><i>Successfully changed</i></p>)}
                </span>
                {this.props.editpassword
                ?(
                    <form onSubmit={this.changePassword}>
                     <input type="password" placeholder="Old password" id="oldpassword" name ="oldpassword" class="form-control" required
                     onChange={this.handleOldPasswordChange}/>
                     <input type="password" placeholder="New password" id="newpassword" name ="newpassword" class="form-control" required
                     pattern=".{6,}" 
                     onChange={this.handleNewPasswordChange}/>
                    {this.state.newpassword&&this.state.newpassword.length<6&&(
                        <div style={{color:"red"}}>Password needs to have at least 6 characters</div>
                    )}
                    {this.props.psunmatch&&(
                        <div style={{color:"red"}}>Old password does not match</div>
                    )}
                     <button type="submit" class={`${styles.button}`}><i class="fas fa-check"></i></button>
                     <button type="button" class={`${styles.button}`} onClick={this.props.cancelChange}><i class="fas fa-times"></i></button>
                     </form>
                )
                :null
                }
                </div>
                <div>
                <label for="location"><strong>Location&nbsp;</strong></label>
                {this.props.editlocation
                ?(
                    <form style={{'display':'inline'}} onSubmit={this.changeLocation}>
                   <input type="text" class="form-control" placeholder={this.props.location}  id="location" required
                      onChange={this.handleLocationChange}/>
                     <button type="submit" class={`${styles.button}`}><i class="fas fa-check"></i></button>
                     <button type="button" class={`${styles.button}`} onClick={this.props.cancelChange}><i class="fas fa-times"></i></button>
                     </form>
                )
                :(<span>{this.props.location}
                <button class={`${styles.button}`} onClick={this.props.startChangeLocation}><i class="fas fa-edit"></i></button>
                </span>)
                }
                </div>
                <div>
                <label for="email"><strong>Email&nbsp;</strong></label>
                {this.props.editemail
                ?(
                    <form style={{'display':'inline'}} class="form-inline" onSubmit={this.changeEmail}>
                     <input type="email" placeholder={this.props.email} id="email" name ="email" class="form-control" required
                     onChange={this.handleEmailChange}/>
                     <button type="submit" class={`${styles.button}`}><i class="fas fa-check"></i></button>
                     <button type="button" class={`${styles.button}`} onClick={this.props.cancelChange}><i class="fas fa-times"></i></button>
                     </form>
                    
                )
                :(<span>{this.props.email}
                <button class={`${styles.button}`}  onClick={this.props.startChangeEmail}><i class="fas fa-edit"></i></button>
                </span>)
                }</div>
            </div>);
    }
}

var dispatchMap = {startChangeEmail,startChangeLocation,startChangePassword,cancelChange,submitChange};

var propsMap = (store)=>{
    return{
        username : store.userinfo.username,
        email:store.userinfo.email,
        location:store.userinfo.location,
        editemail:store.setting.editemail,
        editlocation:store.setting.editlocation,
        editpassword:store.setting.editpassword,
        psunmatch:store.setting.psunmatch,
        changedsucess:store.setting.changedsucess
    };
};

export default connect(propsMap,dispatchMap)(GoogleApiWrapper({
  apiKey: ('AIzaSyCpnZV3MwYpso0pT3Bb8Nr9TqVh1EGR5Jc'),
  libraries:['places']
})(PersonalInfo));
