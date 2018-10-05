require('dotenv').config()
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const axios = require('axios');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const Crypto = require('../helpers/crypto');


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
                    
                    const userId = payload['sub'];
                    resolve(userId);
                }
            })
        }).then((userId) => {
            

            axios({
                method: 'GET',
                url: `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${googleToken}`
            }).then((result) => {

                User.findOne({
                    email: result.data.email
                }).then((user) => {

                    if (user) {

                        let jwttoken = jwt.sign({
                            email: user.email,
                            id: user._id
                        }, process.env.JWT_KEY);

                        res.status(200).json({
                            jwttoken: jwttoken
                        });

                    } else {
                        let firstName = result.data.name.split(' ')[0];

                        axios({
                            method: 'GET',
                            url: `https://gender-api.com/get?name=${firstName}&key=${process.env.GENDER_API_KEY}`
                        }).then((genderData) => {

                            User.create({
                                email: result.data.email,
                                password: null,
                                oauth: 1,
                                name: result.data.name,
                                gender: genderData.data.gender
                            }).then((user) => {

                                let jwttoken = jwt.sign({
                                    email: user.email,
                                    id: user._id
                                }, process.env.JWT_KEY);

                                res.status(200).json({
                                    jwttoken: jwttoken
                                });

                            }).catch((err) => {

                                res.status(500).json(err);

                            });

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
    },

    register: (req, res) => {

        req.body.password = Crypto.encrypt(req.body.password);

        let firstName = req.body.name.split(' ')[0];
        
        axios({
            method: 'GET',
            url: `https://gender-api.com/get?name=${firstName}&key=${process.env.GENDER_API_KEY}`
        }).then((result) => {
            
            req.body.gender = result.data.gender;
            User.create({
                email: req.body.email,
                password: req.body.password,
                oauth: 0,
                name: req.body.name,
                gender: req.body.gender
            }).then((user) => {
    
    
                res.status(200)
    
            }).catch((err) => {
                res.status(500).json({
                    message: 'server error'
                })
            });
        }).catch((err) => {
            res.status(500).json({err:err});
        });
        
        
    },

    login: (req, res) => {
        
        req.body.password = Crypto.encrypt(req.body.password);

        User.findOne({
            
            email: req.body.email,
            password: req.body.password
            
        }).then((user) => {
            
            
            let jwttoken = jwt.sign({email: user.email, id: user._id}, process.env.JWT_KEY)
            
            res.status(200).json({jwttoken: jwttoken});
        }).catch((err) => {
            res.status(500).json({
                message: 'user is not found'
            });
        });
    },

    getUserInfo: (req, res) => {
        User.findById(req.userId).then((user) => {
            res.status(200).json({
                name: user.name,
                gender: user.gender
            })
        }).catch((err) => {
            res.status(500).json(err);
        });
    }
};
