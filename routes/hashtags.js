const express = require('express');
const router = express.Router();
require('../models/connection');
const Tweet = require('../models/tweets');
const User = require('../models/users');
const Hashtag = require('../models/hashtags');



router.post('/creatHashtag', (req, res) => {
    Hashtag.findOne({ hashtag: req.body.hashtag })
        .then((data) => {

            if (data) {

                Hashtag.updateOne(
                    {hashtag : req.body.hashtag},
                    {$addToSet: {tweets: req.body.tweetsId}} // a mettre dans le fetct post du front
                ).then((data) => {

                    return res.json ({
                        result: data.modifiedCount, 
                        report: data
                    })
                });
        // s'il trouve le mot il ajoute l'id de ce nouveau tweet dans le tableau et si il y est déja il ne l'ajoute pas.
            } else{

                const newHashtag = new Hashtag({
             
                    hashtag: req.body.hashtag,
                    tweets : [req.body.tweetsId],
                    
                });

                newHashtag.save()
                .then(newHashtag => {
                    res.json({ result: true, tweet: newHashtag });
                })
                .catch(error => {
                    console.error('Erreur', error);
                    res.status(500).json({ error: 'Erreur' });
                });
            }
     
})

.catch(error => {
    console.error('Erreur', error);
    res.status(500).json({ error: 'Erreur' });
});
});

    
        

        


router.get('/readHashtag', (req, res) => {
    Hashtag.find().then(data => {
    res.json({tweet: data});
  })
});



module.exports = router;



