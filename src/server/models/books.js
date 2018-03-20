var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const Book = new Schema({
    bookId:String,
    title:String,
    authors:[],
    publisher:String,
    publishedDate:String,
    description:String,
    imageUrl:String,
    categories:[],
    ownBy:[]
});

export default mongoose.model('Book',Book);