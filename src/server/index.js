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
import serialize from "serialize-javascript";
import session from 'express-session';
import {StaticRouter, matchPath} from "react-router-dom";
import PassportFunc from './config/passport';

dotenv.config();
const app = express();
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 



mongoose.connect('mongodb://'+process.env.DB_USER+':'+process.env.DB_PASS+'@'+process.env.DB_HOST+':'+process.env.DB_PORT+'/'+process.env.DB);
const db = mongoose.connection;
db.on('error',console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to db');
});

PassportFunc(passport);

app.use(session({
	secret: 'secretBookTrade',
	resave: false,
	saveUninitialized: true
}));


app.use(passport.initialize());
app.use(passport.session());

                               
app.post('/auth', function(req, res) {
  passport.authenticate('local', function(err, user, info) {
    if(err) throw err;
    if (!user) { return res.json({ success: false, message: info.message }); }
    req.logIn(user, function(err) {
      if (err) throw err; 
      return res.json({ success: true, username:user.username,books:user.books,requests:user.requests });
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

  
app.get("*",(req,res) => {
    const store = configureStore();
    if(req.isAuthenticated()){
          store.dispatch({
            type:"LOGGED_IN",
            payload:{username:req.user.username,books:req.user.books,requests:req.user.requests}
        })
    }
    if (req.url=="/profile"&&!req.isAuthenticated()){
      res.redirect('/connect');
    }
    const context = {}
    const markup = renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          <App/>
        </StaticRouter>
      </Provider>
        );
      
    const initialData = store.getState();
    res.send(`
    <!DOCTYPE html>
      <html>
        <head>
          <title>Book Trading Club</title>
          <link rel="shortcut icon" href="">
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
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

app.listen(process.env.PORT || 3000,()=>
console.log("Server is listening")
)