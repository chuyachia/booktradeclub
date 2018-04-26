import Books from "../models/books";
import Trades from "../models/trades";
import Users from "../models/users";

function dbHandler(){
    this.addBook = function(req,res,next){
        if (req.isAuthenticated()){
            var {username, ...bookinfo} =req.body;
            Books.findOneAndUpdate(
                {'bookId':bookinfo.bookId},
                {$push:{ownBy:username}},
                {new:true}
            ).exec((err,result) => {
                if (err) return next(err);
                if (result) {
                    return res.send({success:true,message:"Added a new owner to an existing book."});
                }
                bookinfo.ownBy = [username];
                var newBook = new Books(bookinfo);
                newBook.save((err,result)=>{
                    if (err) return next(err);
                    return res.send({success:true,message:"Added a new book."});
                })
            })} else {
            res.send({success:false,message:"Please log in or sign up first"});
        }
    }
    
    this.removeBook= function(req,res,next){
        Books.findOneAndUpdate(
                {'bookId':req.params.bookid},
                {$pull:{ownBy:req.params.username}},
                {new:true}
        ).exec((err,result) => {
            if (err) return next(err);
            if(result.ownBy.length==0){
                Books.remove(
                    {'bookId':req.params.bookid}
                ).exec((err,result)=>{
                   if (err) return next(err);
                   return res.json({success:true,message:"Book deleted from user"})
                })
            } else {
                res.json({success:true, message:"Book deleted from user"})
            }
        })
    }
    
    this.getAllBooks = function(req,res,next){
        Books.find((err,result)=>{
            if (err) return next(err);
            return res.json(result);
        })
    }
    
    this.getBookInfo= function(req,res,next){
        Books.findOne({'bookId':req.params.bookid})
            .exec((err,result)=>{
                if (err) return next(err);
                return res.json(result);
            })
    }
    
    this.addUser = function(req,res,next){
        Users.findOne(
            {'username':req.body.username})
            .exec((err,result)=>{
                if (err) return next(err);
                if (result){
                    return res.json({success:false,message:"Username exists already"});
                } else {
                    var newUser = new Users();
                    newUser.username= req.body.username;
                    newUser.password = newUser.generateHash(req.body.password);
                    newUser.email = req.body.email;
                    newUser.location = req.body.location;
                    newUser.save((err,result)=>{
                        if (err) return next(err);
                        return res.json({success:true,message:"User added"})
                    })
                }
            })
    }
    
    this.getUsersLocation = function(req,res,next){
        Users.find({
            'username':{$in:req.query.users}
        }).sort({ 'username' : 1 }).exec((err,results)=>{
            if (err) return next(err);
            return res.json(results.map(result=>result.location));
        })
    }
    
    this.getUserBooks = function(req,res,next){
        Books.find({ownBy:req.params.username}).exec((err,results)=>{
            if (err) return next(err);
            return res.json(results)
        })
    }
    
    this.handleRequest = function(req,res,next){
        switch(req.body.action){
            case "add":
                var newTrade = new Trades();
                newTrade.sender.username = req.body.from;
                newTrade.sender.unread =true;
                newTrade.sender.email = req.body.email;
                newTrade.receiver.username = req.body.to;
                newTrade.receiver.bookId = req.body.bookid;
                newTrade.receiver.bookName = req.body.bookname;
                newTrade.receiver.unread=true;
                newTrade.status="pending"
                newTrade.save((err,result)=>{
                    if (err) return next(err);
                    return res.json({success:true,message:"New request added",data:result})
                })
                break;
            case "exchange":
                Trades.findOneAndUpdate({_id:req.body.tradeid},{$set:
                {
                    "sender.bookId":req.body.bookid,
                    "sender.bookName":req.body.bookname,
                    "sender.unread":true,
                    "receiver.email":req.body.email
                }})
                .exec((err,result)=>{
                    if (err) return next(err);
                    return res.json({success:true,message:"New exchange added"});
                })
                break;
            case "confirm":
                Trades.findOneAndUpdate({_id:req.body.tradeid},{$set:{
                    "status":"confirmed",
                    "receiver.unread":true
                }})
                .exec((err,result)=>{
                    if (err) return next(err);
                    return res.json({success:true,message:"Trade confirmed"});
                })
                break;
            case "decline":
                if (req.body.to=="sender"){
                    Trades.findOneAndUpdate({_id:req.body.tradeid},{$set:{
                        status:"declined",
                        "sender.unread":true
                    }})
                    .exec((err,result)=>{
                            if (err) return next(err);
                            return res.json({success:true,message:"Trade declined"});
                        })
                } else {
                    Trades.findOneAndUpdate({_id:req.body.tradeid},{$set:{
                        status:"declined",
                        "receiver.unread":true
                    }})
                    .exec((err,result)=>{
                            if (err) return next(err);
                            return res.json({success:true,message:"Trade declined"});
                        })
                }
                break;
            case "read":
                if (req.body.role=='sender'){
                    Trades.findOneAndUpdate({_id:req.body.tradeid},{'sender.unread':false})
                    .exec((err,result)=>{
                        if (err) return next(err);
                        return res.json({success:true,message:"Change read state"});
                    })
                } else {
                    Trades.findOneAndUpdate({_id:req.body.tradeid},{'receiver.unread':false})
                    .exec((err,result)=>{
                        if (err) return next(err);
                        return res.json({success:true,message:"Change read state"});
                    })
                }
                break;
                
        }
    }
    
    this.getRequests = function(req,res,next){
        Trades.find({
            $or:[{'sender.username':req.params.username},{'receiver.username':req.params.username}]
        }).exec((err,result)=>{
            if (err) return next(err);
            res.json(result);
        })
    }
    this.resetPassword = function(req,res,next){
        Users.findOne({username: req.body.username}).exec(
          (err,user)=>{
            if (err) return next(err);
            if (!user) {
              res.json({success:false,status:'wrongusername'})
            } else if (!user.validPassword(req.body.oldpassword)) {
                res.json({success:false,status:'wrongpassword'})
            } else {
                Users.findOneAndUpdate({username: req.body.username},
                    {password:user.generateHash(req.body.newpassword)}) 
                    .exec((err,result)=>{
                        if (err) return next(err);
                        res.json({success:true,status:'passwordchanged'})
                    })
            }
          })

    }
    
    this.changeUserInfo = function(req,res,next){
        switch(req.body.action){
            case "email":
                Users.findOneAndUpdate({'username':req.body.username},{email:req.body.data},{new:true})
                .exec((err,result)=>{
                    if (err) return next(err);
                    res.json({success:true,result:result});
                })
                break;
            case "location":
                Users.findOneAndUpdate({'username':req.body.username},{location:req.body.data},{new:true})
                .exec((err,result)=>{
                    if (err) return next(err);
                    res.json({success:true,result:result});
                })
                break;
    
        }
    }

}

export default new dbHandler();