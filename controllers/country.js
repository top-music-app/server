const axios = require('axios')
require('dotenv').config()

module.exports = {
    show: function(req, res){
        axios({
            method: 'GET',
            url: 'http://ip-api.com/json'
        })
        .then((result) => {
            res.status(200).json({data: result.data})            
        }).catch((err) => {
            console.log(err)  
        });
    },
    getList: function (req, res){
        axios({
            url: `https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page_size=5&country='${req.params.code}'&f_has_lyrics=1`,
            data: {
                apikey: process.env.API_KEY
            }
        })
        .then(function(data) {
            // console.log(data.data.message.body.track_list);
            res.status(200).json({data: data.data.message.body.track_list})
        })
        .catch(function(err) {
            console.log(err);
        })
    },
    getLyrik: function(req, res) {
        axios({
            method: 'GET',
            url: `https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${req.body.track_id}&apikey=${process.env.API_KEY}`,
        })
        .then(function(data) {  
            // console.log(data.data.message.body.lyrics.lyrics_body)
            res.status(200).json({data: data.data.message.body.lyrics.lyrics_body})            
        })
        .catch(function(err){
            console.log(err);
        })
    }
    // searchCountry: function(req, res){
    //     axios({
    //       method: 'GET',
    //       url: `https://restcountries.eu/rest/v2/name/${req.params.key}`,
    //       dataType: 'json'
    //     })
    //     .then(function(data){
    //         res.status
    //       let code = data[0].alpha2Code
    //     //   getList(code.toLowerCase())
          
    //     })
    //     .catch(err => {
    //       console.log('err');
          
    //     })
        
    //   }
}



