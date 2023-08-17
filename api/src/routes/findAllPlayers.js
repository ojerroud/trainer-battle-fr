const { Player } = require('../db/sequelize');
const auth = require('../auth/auth');

module.exports = (app) => {
	app.get('/api/players', auth, (req, res) => {
		Player.findAll()
			.then((players) => {
				const message = 'La liste des joueurs a bien été récupérée.';
				res.json({ message, data: players });
			})
			.catch((error) => {
				const message =
					"La liste des joueurs n'a pas pu être récupérée. Veuillez ré-essayer";
				res.status(500).json({ message, data: error });
			});
	});
};
