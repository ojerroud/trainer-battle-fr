const { Player } = require('../db/sequelize');
const auth = require('../auth/auth');

module.exports = (app) => {
	app.get('/api/players/:id', auth, (req, res) => {
		Player.findByPk(req.params.id)
			.then((player) => {
				if (!player) {
					const message =
						"Le joueur demandé n'existe pas. Réessayer avec un autre identifiant.";
					return res.status(404).json({ message });
				}

				const message = 'Un joueur a bien été trouvé.';
				res.json({ message, data: player });
			})
			.catch((error) => {
				const message =
					"Le joueur n'a pas pu être récupéré. Veuillez réessayez plus tard.";
				res.status(500).json({ message, data: error });
			});
	});
};
