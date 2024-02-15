var express = require("express");
var router = express.Router();

const User = require("../models/users");
const bcrypt = require("bcrypt");

function checkBody(body, keys) {
	for (const key of keys) {
		if (!body[key]) return false;
	}

	return true;
}

router.post("/signup", function (req, res) {
	const { firstname,secondname, password } = req.body;

	const result = checkBody(req.body, ["firstname", "secondname", "password"]);
	if (!result) return res.json({ result: false, error: "Champs manquants ou vides" });

	User.findOne({ firstname, secondname })
		.then((data) => {
			if (data) return res.json({ result: false, error: "Utilisateur déjà existant" });

			const hashedPassword = bcrypt.hashSync(password, 10);
			const newUser = new User({ firstname, secondname, password: hashedPassword });

			newUser
				.save()
				.then(() => {
					return res.json({ result: true, user: { firstname: newUser.firstname, secondname: newUser.secondname } });

				})
				.catch((e) => {
					console.error(e);
					return res.json({ result: false, error: "Erreur serveur" });
				});
		})
		.catch((e) => {
			console.error(e);
			return res.json({ result: false, error: "Erreur serveur" });
		});
});

router.post("/signin", function (req, res) {
	const { firstname, password } = req.body;

	const result = checkBody(req.body, ["firstname", "password"]);
	if (!result) return res.json({ result: false, error: "Champs manquants ou vides" });

	User.findOne({ firstname })
		.then((data) => {
			if (!data) return res.json({ result: false, error: "Utilisateur non existant" });

			const pwdMatch = bcrypt.compareSync(password, data.password);
			if (!pwdMatch) return res.json({ result: false, error: "Mot de passe incorrect" });

			return res.json({ result: true, user: data.firstname });
		})
		.catch((e) => {
			console.error(e);
			return res.json({ result: false, error: "Erreur serveur" });
		});
});

module.exports = router;
