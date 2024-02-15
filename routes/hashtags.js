const express = require('express');
const router = express.Router();
require('../models/connection');
const Tweet = require('../models/tweets');
const User = require('../models/users');
const Hashtag = require('../models/hashtags');



router.post('/creatHashtag', (req, res) => {
    Hashtag.findOne({ message: req.body.message })
        .then(hashtag => {
            const newHashtag = new Hashtag({
             
                message: req.body.message,
                
            });

            newHashtag.save()
                .then(newHashtag => {
                    res.json({ result: true, tweet: newHashtag });
                })
                .catch(error => {
                    console.error('Erreur', error);
                    res.status(500).json({ error: 'Erreur' });
                });
        })
        .catch(error => {
            console.error('erreur', error);
            res.status(500).json({ error: 'erreur' });
        });
});


router.get('/readHashtag', (req, res) => {
    Hashtag.find().then(data => {
    res.json({tweet: data});
  })
});



module.exports = router;



