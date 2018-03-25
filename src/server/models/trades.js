var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const Trade = new Schema({
    sender:{
        username:String,
        email:String,
        bookId:String,
        bookName:String,
        unread:Boolean
    },
    receiver:{
        username:String,
        email:String,
        bookId:String,
        bookName:String,
        unread:Boolean
    },
    status:String
});

export default mongoose.model('Trade',Trade);