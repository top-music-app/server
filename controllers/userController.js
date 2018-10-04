require('dotenv').config()
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const axios = require('axios');
const User = require('../models/user');
const jwt = require('jsonwebtoken');


module.exports = {
    loginGoogle: (req, res) => {
        let googleToken = req.body.token;

        var ticket = new Promise((resolve, reject) => {
            client.verifyIdToken({
            idToken: googleToken,
            audience: process.env.GOOGLE_CLIENT_ID
            }, (err, data) => {

            if (err) {
                reject(err);
            } else {
                const payload = data.getPayload();
                console.log('payload');
                const userId = payload['sub'];
                resolve(userId);
            }
            })
        }).then((userId) => {
            console.log('requesting google API.....');

            axios({
                method: 'GET',
                url: `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${googleToken}`
            }).then((result) => {
        
                User.findOne({email: result.data.email}).then((user) => {
                
                    if (user) {
                        
                        let jwttoken = jwt.sign({email: user.email, id: user._id}, process.env.JWT_KEY);
                        
                        res.status(200).json({jwttoken: jwttoken});

                    } else {
                    
                        User.create({
                        email: result.data.email,
                        password:null,
                        oauth: 1,
                        name: result.data.name
                        }).then((user) => {

                            let jwttoken = jwt.sign({email: user.email, id: user._id}, process.env.JWT_KEY);
                            
                            res.status(200).json({jwttoken: jwttoken});

                        }).catch((err) => {

                            res.status(500).json(err);

                        });
                }
                }).catch((err) => {
                    res.status(500).json(err);
                });
 
            }).catch((err) => {
                res.status(500).json(err);
            });

        }).catch((err) => {
            res.status(500).json(err);
        });
            }
};
