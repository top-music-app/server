const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:  {
        type: String,
        unique: true
    },
    name: String,
    password: String,
    oauth: {
        type: Number,
        required: true
    }
});

//TODO ADD CUSTOM EMAIL VALIDATOR

var User = mongoose.model('User', userSchema);

module.exports = User;