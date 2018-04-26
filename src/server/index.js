// Attach requests data to user when log in as books

import apiHandler from "./controllers/apiHandler";
import App from "../shared/App";
import bodyParser from 'body-parser';
import configureStore from "../shared/configureStore";
import dbHandler from "./controllers/dbHandler";
import dotenv from 'dotenv';
import express from "express";
import mongoose from "mongoose";
import passport from 'passport';
import { Provider } from "react-redux";
import React from "react";
import {renderToString} from "react-dom/server";
import routes from "../shared/routes";
import serialize from "serialize-javascript";
import session from 'express-session';
import {StaticRouter, matchPath} from "react-router-dom";
import PassportFunc from './config/passport';

dotenv.config();
const app = express();
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 



mongoose.connect('mongodb://'+process.env.DB_USER+':'+process.env.DB_PASS+'@'+process.env.DB_HOST+':'+process.env.DB_PORT+'/'+process.env.DB,
{ keepAlive: 1})
.then(function(){
  console.log('connected to db');
})
.catch(function(err){
  console.log(err);
})


PassportFunc(passport);

app.use(session({
	secret: 'secretBookTrade',
	resave: false,
	saveUninitialized: true
}));


app.use(passport.initialize());
app.use(passport.session());

                               
app.post('/auth', function(req, res,next) {
  passport.authenticate('local', function(err, user, info) {
    if(err)  return next(err);
    if (!user) { return res.json({ success: false, message: info.message }); }
    req.logIn(user, function(err) {
      if (err) return next(err); 
      return res.json({ 
        success: true, 
        username:user.username,
        email:user.email,
        location:user.location,
        books:user.books,
        requests:user.requests 
        
      });
    });
  })(req, res);
});

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});


app.route('/search/:bookname')
  .get(apiHandler.search);
  
app.route('/book')
  .post(dbHandler.addBook);

app.route('/book/:bookid/:username')
  .delete(dbHandler.removeBook);

app.route('/bookinfo/:bookid')
  .get(dbHandler.getBookInfo);
  
app.route('/allbooks')
  .get(dbHandler.getAllBooks);

app.route('/newuser')
  .post(dbHandler.addUser);
  
app.route('/userslocation')
  .get(dbHandler.getUsersLocation);

app.route('/request')
  .post(dbHandler.handleRequest);

app.route('/request/:username')
  .get(dbHandler.getRequests);
  
app.route('/userbooks/:username')
  .get(dbHandler.getUserBooks);

app.route('/userinfo')
  .put(dbHandler.changeUserInfo)
  
app.route('/passwordreset')
  .put(dbHandler.resetPassword)
  
app.get("*",(req,res) => {
    const store = configureStore();
    if(req.isAuthenticated()){
          store.dispatch({
            type:"LOGGED_IN",
            payload:{
              username:req.user.username,
              books:req.user.books,
              requests:req.user.requests,
              email:req.user.email,
              location:req.user.location,
            }
        })
    }
    if ((req.url=="/profile"||req.url=="/request")&&!req.isAuthenticated()){
      res.redirect('/connect');
    }
    if (req.url=="/connect"&&req.isAuthenticated()){
      res.redirect('/');
    }
    const context = {}
    const markup = renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          <App/>
        </StaticRouter>
      </Provider>
        );
    if (matchPath(req.url,routes).path!=req.url)
      res.status(404)
    const initialData = store.getState();
    res.send(`
    <!DOCTYPE html>
      <html>
        <head>
          <title>Book Trading Club</title>
          <link rel="shortcut icon" href="">
          <link rel="stylesheet" href="https://unpkg.com/bootstrap-material-design@4.1.1/dist/css/bootstrap-material-design.min.css">
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.6/css/all.css">
          <link rel="stylesheet" href="https://unpkg.com/react-bootstrap-typeahead/css/Typeahead.css">
          <link rel="stylesheet" href="/css/main.css">
          <script>window.__initialData__ = ${serialize(initialData)}</script>
          <script src="/bundle.js" defer></script>
        </head>
        <body>
          <div id="root">${markup}</div>
        </body>
      </html>
      `)
})

app.use(function(err,req,res,next){
  console.log(err.stack);
  res.status(500).send({success:false,status:'servererror'})
})

app.listen(process.env.PORT || 3000,()=>
console.log("Server is listening")
)