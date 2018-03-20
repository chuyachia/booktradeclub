var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt   = require('bcrypt-nodejs');

const User = new Schema({
    username:String,
    password:String,
    email:String,
    location:String,
    books:[]
});

User.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};


User.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

export default mongoose.model('User',User);
