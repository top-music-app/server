const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:  {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
    },
    oauth: {
        type: Number,
        required: true
    },
    favoriteTracks: {
        type: Array
    },
    favoriteArtists: {
        type: Array
    }
}, {
    timestamps: true
});

//TODO ADD CUSTOM EMAIL VALIDATOR

var User = mongoose.model('User', userSchema);

module.exports = User;