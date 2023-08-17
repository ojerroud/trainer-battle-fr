const { Player } = require('../db/sequelize');
const auth = require('../auth/auth');

module.exports = (app) => {
	app.put('/api/players/:id', auth, (req, res) => {
		const id = req.params.id;
		Player.update(req.body, {
			where: { id: id },
		})
			.then((_) => {
				return Player.findByPk(id).then((player) => {
					if (!player) {
						const message = `Le joueur demandé n'existe pas. Veuillez réessayer avec un autre identifiant`;
						res.status(404).json({ message });
					}
					const message = `Le joueur ${player?.name} a bien été modifié`;
					res.json({ message, data: player });
				});
			})
			.catch((error) => {
				const message =
					"Le joueur n'a pas pu être modifié. Veuillez réessayez plus tard.";
				res.status(500).json({ message, data: error });
			});
	});
};
