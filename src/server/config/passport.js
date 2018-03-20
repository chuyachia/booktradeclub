// Local strategy setup
//https://scotch.io/tutorials/easy-node-authentication-setup-and-local
const LocalStrategy = require('passport-local').Strategy;
import Users from "../models/users";
import Books from "../models/books";

export default function(passport){
    passport.serializeUser((user, done) => {  	
    	done(null, user.id)
    })
  
    passport.deserializeUser((id, done) => {
    	Users.findById(id, (err, user) => {  
        Books.find({ownBy:user.username},function(error,books){
          if (error) throw error;
          var booksowned = books.map((book)=>book.bookId);
          user.books = booksowned;
          done(err, user);
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
            Books.find({ownBy:user.username},function(err,books){
              if (err) throw err;
              var booksowned = books.map((book)=>book.bookId);
              user.books = booksowned;
              return done(null, user);
            })
        })
        
        
      })      
    } 
  )
 );  
}