import LoginForm from "../components/LoginForm";
import React from "react";
import RegisterForm from "../components/RegisterForm";
import styles from "../css/Connect.css";
import querystring from "query-string";
import {connect} from "react-redux";
import {Redirect } from "react-router-dom";
import {changePage} from "../actions/connectAction";


var Connect = ({redirect,location,connecttab,changePage})=>{
        var toLogin = ()=>changePage("login");
        var toSignup = ()=>changePage("signup");
        if (redirect){
         var loc = querystring.parse(location.search).redirect;
         return(<Redirect to={{
            pathname: loc?'/'+decodeURIComponent(loc):'/'
          }}/>);
        } else {
            return(
            <div class={`${styles.outer}`}>
                <div class={`${styles.inner}`}>
                    <div class={`card ${styles.card}`}>
                      <div class="card-header">
                        <ul class="nav nav-tabs card-header-tabs nav-fill">
                          <li class="nav-item">
                          <a class={connecttab=="login"?"nav-link active":"nav-link"} onClick={toLogin}>
                          {connecttab=="login"?(<strong>Log in</strong>):"Log in"}
                          </a>
                          </li>
                          <li class="nav-item">
                          <a class={connecttab=="signup"?"nav-link active":"nav-link"} onClick={toSignup}>
                          {connecttab=="signup"?(<strong>Sign up</strong>):"Sign up"}
                          </a>
                          </li>
                        </ul>
                      </div>
                      <div class="card-body">
                        {connecttab=="login"?<LoginForm/>:<RegisterForm/>}
                      </div>
                    </div>
                </div>
            </div>)    
            }
    }

var dispathMap = {changePage};

var propsMap = (store)=>({
        redirect:store.setting.redirect,
        connecttab:store.setting.connecttab
    });

export default connect(propsMap,dispathMap)(Connect);
