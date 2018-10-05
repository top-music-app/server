const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var isEmail = function(val) {
    
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    return re.test(val);
}

const userSchema = new Schema({
    email:  {
        type: String,
        unique: true,
        validate: isEmail
    },
    name: String,
    password: String,
    oauth: {
        type: Number,
        required: true
    },
    gender: String
});

//TODO ADD CUSTOM EMAIL VALIDATOR

var User = mongoose.model('User', userSchema);

module.exports = User;