const User = require('../models/users')
const axios = require('axios')

module.exports = {

    listFavoriteTracks: function (req, res) {
        User.findById(req.userId)
        .then(data => {
            axios({
                url: ``
            })
        })
        .catch(err => {
            res.status(500).json({message: err})
        })
    }
}