var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const Trade = new Schema({
    sender:{
        username:String,
        bookId:String,
        bookName:String,
        unread:Boolean
    },
    receiver:{
        username:String,
        bookId:String,
        bookName:String,
        unread:Boolean
    },
    confirmed:Boolean
});

export default mongoose.model('Trade',Trade);