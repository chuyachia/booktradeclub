import apiHandler from "./api/handler";
import App from "../shared/App";
import auth from "./routes/auth"; 
import bodyParser from 'body-parser';
import books from "./routes/books"; 
import configPassport from './config/passport';
import configureStore from "../shared/configureStore";
import dotenv from 'dotenv';
import express from "express";
import mongoose from "mongoose";
import passport from 'passport';
import { Provider } from "react-redux";
import React from "react";
import {renderToString} from "react-dom/server";
import trades from "./routes/trades"; 
import routes from "../shared/routes";
import serialize from "serialize-javascript";
import session from 'express-session';
import {StaticRouter, matchPath} from "react-router-dom";
import users from "./routes/users"; 
import memoryStoreModule from 'memorystore';

var memoryStore = memoryStoreModule(session);
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
});


configPassport(passport);

app.use(session({
    store: new memoryStore({
      checkPeriod: 86400000
    }),
    secret: 'secretBookTrade',
    resave: false,
    saveUninitialized: false,
    cookie:{sameSite:'strict'}
}));


app.use(passport.initialize());
app.use(passport.session());
app.use('/auth',auth(passport));
app.use('/books',books);
app.use('/trades',trades);
app.use('/users',users);
app.get('/search/:bookname',apiHandler);
  
  
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
          <meta name="viewport" content="width=device-width, initial-scale=1">
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