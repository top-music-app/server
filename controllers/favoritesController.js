const User = require('../models/users')
const axios = require('axios')
const jwt = require('jsonwebtoken')

module.exports = {

    listFavoriteTracks: function (req, res) {
        User.findById(req.userId)
        .then(user => {
            let tracks = []
            if (user.favoriteTracks.length > 0) {
                for (let i = 0; i < user.favoriteTracks.length; i++) {
                    axios({
                        url: `https://api.musixmatch.com/ws/1.1/track.get?track_id=${user.favoriteTracks[i]}`,
                        data: {
                            apikey: process.env.API_KEY
                        }
                    })
                    .then(data => {
                        tracks.push(data.data.message.body.track)
                        if (tracks.length === user.favoriteTracks.length) {
                            res.status(200).json({track: JSON.stringify(tracks)})
                        }
                    })
                    .catch(err => {
                        res.status(500).json({message: err})
                    })
                }
            } else {
                res.status(200).json({track: JSON.stringify(tracks)})
            }
        })
        .catch(err => {
            res.status(500).json({message: err})
        })
    },

    listFavoriteArtists: function (req, res) {
        User.findById(req.userId)
        .then(user => {
            let artists = []
            if (user.favoriteArtists.length > 0) {
                for (let j = 0; j < user.favoriteArtists.length; j++) {
                    axios({
                        url: `https://api.musixmatch.com/ws/1.1/artist.get?artist_id=${user.favoriteArtists[j]}`,
                        data: {
                            apikey: process.env.API_KEY
                        }
                    })
                    .then(data => {
                        artists.push(data.data.message.body.artist)
                        if (artists.length === user.favoriteArtists.length) {
                            res.status(200).json({artist: JSON.stringify(artists)})
                        }
                    })
                    .catch(err => {
                        res.status(500).json({message: err})
                    })
                }
            } else {
                res.status(200).json({artist: JSON.stringify(artists)})
            }
        })
        .catch(err => {
            res.status(500).json({message: err})
        })
    },

    favoriteTrackToggle: function (req, res) {
        User.findById(req.userId)
        .then(user => {
            let favoriteTracks = user.favoriteTracks
            let i = favoriteTracks.indexOf(req.params.trackid) 
            if (i === -1) {
                favoriteTracks.push(req.params.trackid)
            } else {
                favoriteTracks.splice(i, 1)
            }
            User.findByIdAndUpdate(req.userId, {
                favoriteTracks: favoriteTracks
            })
            .then(() => {
                res.status(200).json({message: 'Data updated'})
            })
            .catch(err => {
                res.status(500).json({message: err})
            })
        })
        .catch(err => {
            res.status(500).json({message: err})
        })
    },

    favoriteArtistToggle: function (req, res) {
        User.findById(req.userId)
        .then(user => {
            let favoriteArtists = user.favoriteArtists
            let i = favoriteArtists.indexOf(req.params.artistid) 
            if (i === -1) {
                favoriteArtists.push(req.params.artistid)
            } else {
                favoriteArtists.splice(i, 1)
            }
            User.findByIdAndUpdate(req.userId, {
                favoriteArtists: favoriteArtists
            })
            .then(() => {
                res.status(200).json({message: 'Data updated'})
            })
            .catch(err => {
                res.status(500).json({message: err})
            })
        })
        .catch(err => {
            res.status(500).json({message: err})
        })
    },

    test: function (req, res) {
        User.create({
            name: 'test',
            email: 'test@test.com',
            password: '123456',
            oauth: 0,
            favoriteArtists: ['118', '119']
        })
        .then(data => {
            jwt.sign({id:data._id}, process.env.JWT_KEY, (err, token) => {
                if (err) {
                    res.status(500).json({message: err})
                } else {
                    res.status(200).json({token: token})
                }
            })
        })
        .catch(err => {
            res.status(500).json({message: err})
        })
    }
}