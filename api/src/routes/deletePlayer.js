const { Player } = require('../db/sequelize');
const auth = require('../auth/auth');
// get player before delete for a goodrest app
// get curr id from bdd, then delete it (sync)

module.exports = (app) => {
	app.delete('/api/players/:id', auth, (req, res) => {
		Player.findByPk(req.params.id)
			.then((player) => {
				if (!player) {
					const message = `Le joueur demandé n'existe pas. Veuillez réessayer avec un autre identifiant`;
					return res.status(404).json({ message });
				}

				const playerDeleted = player;

				Player.destroy({
					where: { id: player?.id },
				}).then((_) => {
					const message = `Le joueur ${playerDeleted.name} a bien été supprimé`;
					res.json({ message, data: playerDeleted });
				});
			})
			.catch((error) => {
				const message =
					"Le joueur n'a pas pu être supprimé. Veuillez réessayez plus tard.";
				res.status(500).json({ message, data: error });
			});
	});
};
