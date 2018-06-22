// Take care of register form redirect
import LoginForm from "../components/LoginForm";
import React from "react";
import RegisterForm from "../components/RegisterForm"
import styles from "../css/Connect.css";

class Connect extends React.Component{
    constructor(){
        super()
        this.state={
            choice:"login"
        }
    }
    changePage(target){
        this.setState({choice:target});
    }
    render(){
        return(
        <div class={`${styles.outer}`}>
            <div class={`${styles.inner}`}>
                <div class={`card ${styles.card}`}>
                  <div class="card-header">
                    <ul class="nav nav-tabs card-header-tabs nav-fill">
                      <li class="nav-item">
                      <a class={this.state.choice=="login"?"nav-link active":"nav-link"} onClick={()=>this.changePage("login")}>
                      {this.state.choice=="login"?(<strong>Log in</strong>):"Log in"}
                      </a>
                      </li>
                      <li class="nav-item">
                      <a class={this.state.choice=="signup"?"nav-link active":"nav-link"} onClick={()=>this.changePage("signup")}>
                      {this.state.choice=="signup"?(<strong>Sign up</strong>):"Sign up"}
                      </a>
                      </li>
                    </ul>
                  </div>
                  <div class="card-body">
                    {this.state.choice=="login"?<LoginForm/>:<RegisterForm/>}
                  </div>
                </div>
            </div>
        </div>
        )
    }
}

export default Connect;
