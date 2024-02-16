const express = require('express');
const router = express.Router();
require('../models/connection');
const Tweet = require('../models/tweets');
const User = require('../models/users');


router.post('/creatTweet', (req, res) => {
    const message = req.body.message
// const extractH = extract(message);

    User.findOne({ username: req.body.username })
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
    res.json({tweet: data});
  })
});



module.exports = router;


// const express = require('express');
// const router = express.Router();
// require('../models/connection');
// const Tweet = require('../models/tweets');
// const User = require('../models/users');
// const Hashtag = require('../models/hashtags'); // Importez le modèle de hashtag

// router.post('/creatTweet', (req, res) => {
//     User.findOne({ username: req.body.username })
//         .then(user => {
//             if (!user) {
//                 return res.status(404).json({ error: 'Utilisateur non trouvé' });
//             }

//             const newTweet = new Tweet({
//                 date: new Date(),
//                 message: req.body.message,
//                 likes: 0,
//                 user: user._id
//             });

//             newTweet.save()
//                 .then(async newTweet => {
//                     // Recherchez les hashtags dans le message du tweet
//                     const hashtagRegex = /#(\w+)/g;
//                     let match;
//                     const hashtags = [];

//                     while ((match = hashtagRegex.exec(newTweet.message)) !== null) {
//                         hashtags.push(match[1]); // Ajoutez le hashtag (le mot sans le #) au tableau des hashtags
//                     }

//                     // Enregistrez chaque hashtag dans la collection de hashtags
//                     const hashtagPromises = hashtags.map(async (tag) => {
//                         try {
//                             const newHashtag = new Hashtag({
//                                 message: tag,
//                                 tweet: newTweet._id
//                             });

//                             await newHashtag.save();
//                             return newHashtag;
//                         } catch (error) {
//                             console.error('Erreur lors de l\'enregistrement du hashtag:', error);
//                             throw error;
//                         }
//                     });

//                     // Attendez que toutes les opérations de sauvegarde de hashtag soient terminées
//                     await Promise.all(hashtagPromises);

//                     res.json({ result: true, tweet: newTweet });
//                 })
//                 .catch(error => {
//                     console.error('Erreur lors de l\'enregistrement du tweet:', error);
//                     res.status(500).json({ error: 'Erreur serveur lors de l\'enregistrement du tweet' });
//                 });
//         })
//         .catch(error => {
//             console.error('Erreur lors de la recherche de l\'utilisateur:', error);
//             res.status(500).json({ error: 'Erreur serveur lors de la recherche de l\'utilisateur' });
//         });
// });

// router.get('/readTweet', (req, res) => {
//     Tweet.find().then(data => {
//         res.json({tweet: data});
//     })
// });

// module.exports = router;

