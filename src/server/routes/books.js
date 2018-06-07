import express from 'express';
import Books from '../models/books';

const books = express.Router();

books.post('/add',function(req,res,next){
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
            });
        });
    } else {
        res.send({success:false,message:"Please log in or sign up first"});
    }
});

books.delete('/remove/:bookid/:username',function(req,res,next){
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
               return res.json({success:true,message:"Book deleted from user"});
            });
        } else {
            res.json({success:true, message:"Book deleted from user"});
        }
    });
});

books.get('/all',function(req,res,next){
    Books.find((err,result)=>{
        if (err) return next(err);
        return res.json(result);
    });
});

books.get('/info/:bookid',function(req,res,next){
    Books.findOne({
        'bookId':req.params.bookid
    }).exec((err,result)=>{
        if (err) return next(err);
        return res.json(result);
    });
});

books.get('/user/:username',function(req,res,next){
    Books.find({
        ownBy:req.params.username
    }).exec((err,results)=>{
        if (err) return next(err);
        return res.json(results);
    });
});

export default books;
