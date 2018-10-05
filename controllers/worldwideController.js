const axios = require('axios');

module.exports = {
    worldwideTracks: function(req, res) {
        axios({
            method: 'GET',
            url: `https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=12&country=us&f_has_lyrics=1&apikey=${process.env.API_KEY}`
        })
            .then(function(tracks) {
                res.status(200).send(tracks.data.message.body);
            })
            .catch(function(err) {
                res.status(500).json(err);
            });
    },

    worldwideArtists: function(req, res) {
        axios({
            method: 'GET',
            url: `https://api.musixmatch.com/ws/1.1/chart.artists.get?format=json&callback=callback&page=1&page_size=9&country=us&apikey=${process.env.API_KEY}`
        })
            .then(function(artists) {
                res.status(200).send(artists.data.message.body);
            })
            .catch(function(err) {
                res.status(500).json(err);
            });
    }
}