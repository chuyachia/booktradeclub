// Local strategy setup
//https://scotch.io/tutorials/easy-node-authentication-setup-and-local
const LocalStrategy = require('passport-local').Strategy;
import Books from "../models/books";
import Trades from "../models/trades";
import Users from "../models/users";


export default function(passport){
    passport.serializeUser((user, done) => {  	
    	done(null, user.id)
    })
  
    passport.deserializeUser((id, done) => {
    	Users.findById(id, (err, user) => {
    	  if (err) throw err;
    	 Trades.find({
            $or:[{'sender.username':user.username},{'receiver.username':user.username}]
        }).exec((error,result)=>{
            if (error) throw error;
            user.requests = result;
            Books.find({ownBy:user.username},function(error,books){
              if (error) throw error;
              user.books = books;
              done(err, user);
            })
        })
    		
    	})
    })
  
	passport.use(new LocalStrategy(
	    function (username, password, done) {
        process.nextTick(function (){
        Users.findOne({username: username}).exec(
          function(err,user){
            if (err) {return done(err);}
            if (!user) {
              return done(null, false, { message: 'Wrong username or password.' });
            }
            if (!user.validPassword(password)) {
                return done(null, false, { message: 'Wrong username or password.' });
            }
          	 Trades.find({
                  $or:[{'sender.username':user.username},{'receiver.username':user.username}]
              }).exec((error,result)=>{
                  if (error) throw error;
                  user.requests = result;
                  Books.find({ownBy:user.username},function(error,books){
                    if (error) throw error;
                    user.books = books;
                    done(null, user);
                  })
              })
            
        })
        
        
      })      
    } 
  )
 );  
}