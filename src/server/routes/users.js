import express from 'express';
import Users from "../models/users";

const users = express.Router();

users.post('/new',function(req,res,next){
    Users.findOne({'username':req.body.username})
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
                    return res.json({success:true,message:"User added"});
                });
            }
        });
});

users.get('/location',function(req,res,next){
    Users.find({
        'username':{$in:req.query.users}
    }).sort({ 'username' : 1 }).exec((err,results)=>{
        if (err) return next(err);
        return res.json(results.map(result=>result.location));
    });
});

users.put('/changepw', function(req,res,next){
    Users.findOne({
        username: req.body.username
    }).exec((err,user)=>{
        if (err) return next(err);
        if (!user) {
          res.json({success:false,status:'wrongusername'});
        } else if (!user.validPassword(req.body.oldpassword)) {
            res.json({success:false,status:'wrongpassword'});
        } else {
            Users.findOneAndUpdate({
                username: req.body.username
            },
            {
                password:user.generateHash(req.body.newpassword)
            }) .exec((err,result)=>{
                if (err) return next(err);
                res.json({success:true,status:'passwordchanged'});
            });
        }
    });
})

users.put('/changeinfo', function(req,res,next){
    switch(req.body.action){
        case "email":
            Users.findOneAndUpdate({'username':req.body.username},{email:req.body.data},{new:true})
            .exec((err,result)=>{
                if (err) return next(err);
                res.json({success:true,result:result});
            });
            break;
        case "location":
            Users.findOneAndUpdate({'username':req.body.username},{location:req.body.data},{new:true})
            .exec((err,result)=>{
                if (err) return next(err);
                res.json({success:true,result:result});
            });
            break;
    }
});

export default users;