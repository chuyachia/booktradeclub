import express from 'express';
import Trades from '../models/trades';

const trades = express.Router();

trades.get('/:username',function(req,res,next){
    Trades.find({
        $or:[{'sender.username':req.params.username},{'receiver.username':req.params.username}]
    }).exec((err,result)=>{
        if (err) return next(err);
        res.json(result);
    });
});

trades.post('/handle',function(req,res,next){
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
            newTrade.status="pending";
            newTrade.save((err,result)=>{
                if (err) return next(err);
                return res.json({success:true,message:"New request added",data:result});
            });
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
            });
            break;
        case "confirm":
            Trades.findOneAndUpdate({_id:req.body.tradeid},{$set:{
                "status":"confirmed",
                "receiver.unread":true
            }})
            .exec((err,result)=>{
                if (err) return next(err);
                return res.json({success:true,message:"Trade confirmed"});
            });
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
                    });
            } else {
                Trades.findOneAndUpdate({_id:req.body.tradeid},{$set:{
                    status:"declined",
                    "receiver.unread":true
                }})
                .exec((err,result)=>{
                    if (err) return next(err);
                    return res.json({success:true,message:"Trade declined"});
                });
            }
            break;
        case "read":
            if (req.body.role=='sender'){
                Trades.findOneAndUpdate({_id:req.body.tradeid},{'sender.unread':false})
                .exec((err,result)=>{
                    if (err) return next(err);
                    return res.json({success:true,message:"Change read state"});
                });
            } else {
                Trades.findOneAndUpdate({_id:req.body.tradeid},{'receiver.unread':false})
                .exec((err,result)=>{
                    if (err) return next(err);
                    return res.json({success:true,message:"Change read state"});
                });
            }
            break;
            
    }
});

export default trades;