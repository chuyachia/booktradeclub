import Books from "../models/books";
import Trades from "../models/trades";
import Users from "../models/users";

function dbHandler(){
    this.addBook = function(req,res){
        console.log(req.isAuthenticated());
        if (req.isAuthenticated()){
            var {username, ...bookinfo} =req.body;
            Books.findOneAndUpdate(
                {'bookId':bookinfo.bookId},
                {$push:{ownBy:username}},
                {new:true}
            ).exec((err,result) => {
                if (err) throw err;
                if (result) {
                    console.log(result);
                    res.send({success:true,message:"Added a new owner to an existing book."});
                } else {
                    bookinfo.ownBy = [username];
                    var newBook = new Books(bookinfo);
                    newBook.save((err,result)=>{
                        if (err) throw err;
                        console.log(result);
                        res.send({success:true,message:"Added a new book."});
                    })
                }
            })} else {
            res.send({success:false,message:"Please log in or sign up first"});
        }
    }
    
    this.getAllBooks = function(req,res){
        Books.find((err,result)=>{
           if (err) throw err;
           res.send(result);
        })
    }
    
    this.addUser = function(req,res){
        Users.findOne(
            {'username':req.body.username})
            .exec((err,result)=>{
                if (err) throw err;
                if (result){
                    res.send({success:false,message:"Username exists already"})
                } else {
                    var newUser = new Users();
                    newUser.username= req.body.username;
                    newUser.password = newUser.generateHash(req.body.password);
                    newUser.email = req.body.email;
                    newUser.location = req.body.location;
                    newUser.save((err,result)=>{
                        if (err) throw err;
                        res.send({success:true,message:"User added"})
                    })
                }
            })
    }
    
    this.getUsersLocation = function(req,res){
        Users.find({
            'username':{$in:req.query.users}
        }).exec((err,results)=>{
            if (err) throw err;
            res.send(results.map(result=>result.location));
        })
    }
    
    this.getUserBooks = function(req,res){
        Books.find({ownBy:req.params.username}).exec((err,results)=>{
            if (err) throw err;
            res.send(results)
        })
    }
    
    this.handleRequest = function(req,res){
        switch(req.body.action){
            case "add":
                var newTrade = new Trades();
                newTrade.sender.username = req.body.from;
                newTrade.receiver.username = req.body.to;
                newTrade.receiver.bookId = req.body.bookid;
                newTrade.receiver.bookName = req.body.bookname;
                newTrade.receiver.unread=true;
                newTrade.save((err,result)=>{
                    if(err) throw err;
                    res.send({success:true,message:"New request added"})
                })
                break;
            case "exchange":
                console.log(req.body);
                Trades.findOneAndUpdate({_id:req.body.tradeid},{$set:
                {"sender.bookId":req.body.bookid,"sender.bookName":req.body.bookname}})
                .exec((err,result)=>{
                    if(err) throw err;
                    res.send({success:true,message:"New exchange added"});
                })
                break;
            case "confirm":
                Trades.findOneAndUpdate({_id:req.body.tradeid},{confirmed:true})
                .exec((err,result)=>{
                    if(err) throw err;
                    res.send({success:true,message:"Trade confirmed"});
                })
                break;
        }
    }
    
    this.getRequests = function(req,res){
        //req.body.username
        Trades.find({
            $or:[{'sender.username':req.params.username},{'receiver.username':req.params.username}]
        }).exec((err,result)=>{
            if (err) throw err;
            res.send(result);
        })
    }

}

export default new dbHandler();