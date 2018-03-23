import Books from "../models/books";
import Trades from "../models/trades";
import Users from "../models/users";

function dbHandler(){
    this.addBook = function(req,res){
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
    
    this.removeBook= function(req,res){
        Books.findOneAndUpdate(
                {'bookId':req.params.bookid},
                {$pull:{ownBy:req.params.username}},
                {new:true}
        ).exec((err,result) => {
            if (err) throw err;
            if(result.ownBy.length==0){
                Books.remove(
                    {'bookId':req.params.bookid}
                ).exec((err,result)=>{
                   if (err) throw err;
                   res.send({message:"book deleted"})
                })
            } else {
                res.send({message:"book deleted"})
            }
        })
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
                newTrade.sender.unread =false;
                newTrade.receiver.username = req.body.to;
                newTrade.receiver.bookId = req.body.bookid;
                newTrade.receiver.bookName = req.body.bookname;
                newTrade.receiver.unread=true;
                newTrade.status="pending"
                newTrade.save((err,result)=>{
                    if(err) throw err;
                    res.send({success:true,message:"New request added",data:result})
                })
                break;
            case "exchange":
                Trades.findOneAndUpdate({_id:req.body.tradeid},{$set:
                {
                    "sender.bookId":req.body.bookid,
                    "sender.bookName":req.body.bookname,
                    "sender.unread":true,
                    "receiver.unread":false,
                }})
                .exec((err,result)=>{
                    if(err) throw err;
                    res.send({success:true,message:"New exchange added"});
                })
                break;
            case "confirm":
                Trades.findOneAndUpdate({_id:req.body.tradeid},{status:"confirmed"})
                .exec((err,result)=>{
                    if(err) throw err;
                    res.send({success:true,message:"Trade confirmed"});
                })
                break;
            case "decline":
                Trades.findOneAndUpdate({_id:req.body.tradeid},{status:"declined"})
                .exec((err,result)=>{
                    if(err) throw err;
                    res.send({success:true,message:"Trade declined"});
                })
                break;
                
        }
    }
    
    this.getRequests = function(req,res){
        Trades.find({
            $or:[{'sender.username':req.params.username},{'receiver.username':req.params.username}]
        }).exec((err,result)=>{
            if (err) throw err;
            console.log(result)
            res.send(result);
        })
    }
    
    this.changeUserInfo = function(req,res){
        switch(req.body.action){
            case "email":
                Users.findOneAndUpdate({'username':req.body.username},{email:req.body.data},{new:true})
                .exec((err,result)=>{
                    if (err) throw err;
                    res.send(result);
                })
                break;
            case "location":
                Users.findOneAndUpdate({'username':req.body.username},{location:req.body.data},{new:true})
                .exec((err,result)=>{
                    if (err) throw err;
                    res.send(result);
                })
                break;
    
        }
    }

}

export default new dbHandler();