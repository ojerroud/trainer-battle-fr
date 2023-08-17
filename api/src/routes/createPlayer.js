const { Player } = require('../db/sequelize');
const auth = require('../auth/auth');

module.exports = (app) => {
	app.post('/api/players', auth, (req, res) => {
		Player.findOrCreate({ where: { name: req.body.name } })
			.then(([player, created]) => {
				if (!created) {
					const message = `le joueur ${req.body.name} existe deja !`;
					return res.json({ message });
				}
				const message = `le joueur ${req.body.name} a bien été crée`;
				res.json({ message, player });
			})
			.catch((error) => {
				const message =
					"Le joueur n'a pas pu être ajouté. Veuillez réessayez plus tard.";
				res.status(500).json({ message, data: error });
			});
	});
};
