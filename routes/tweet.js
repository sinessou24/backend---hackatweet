const express = require('express');
const router = express.Router();

const Tweet = require('../models/tweets');
const User = require('../models/users');


router.post('/creatTweet', (req, res) => {
    const message = req.body.message
// const extractH = extract(message);

    User.findOne({ token: req.body.token })
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: 'Utilisateur non trouvé' });
            }

            const newTweet = new Tweet({
                date: new Date(),
                message: message,
                likes: 0,
                user: user._id,
                // hashtag : extractH,
            });


            newTweet.save()
                .then(newTweet => {
                    //créer un tableau pour stocker les #
                    //ensuite faire une boucle pour les .save

                 






                    res.json({ result: true, tweet: newTweet });
                })
                .catch(error => {
                    console.error('Erreur lors de l\'enregistrement du tweet:', error);
                    res.status(500).json({ error: 'Erreur serveur lors de l\'enregistrement du tweet' });
                });
        })
        .catch(error => {
            console.error('Erreur lors de la recherche de l\'utilisateur:', error);
            res.status(500).json({ error: 'Erreur serveur lors de la recherche de l\'utilisateur' });
        });
});



// function extract() {
// const hashtagRegex = /#(\w+)/g;
// let match;
// const hashtags = [];

// while ((match = hashtagRegex.exec(newTweet.message)) !== null) {
//     hashtags.push(match[0]); 
// }

// console.log(hashtags)
// }


router.get('/readTweet', (req, res) => {
    Tweet.find().then(data => {
    res.json({tweets: data});
  })
});


module.exports = router