const { User } = require('../db/sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const privateKey = require('../auth/private_key');

module.exports = (app) => {
	app.post('/api/login', async (req, res) => {
		try {
			const user = await User.findOne({
				where: {
					username: req.body.username,
				},
			});

			if (!user) {
				return res
					.status(404)
					.json({ message: "L'utilisateur demandé n'existe pas." });
			}

			const isPasswordValid = await bcrypt.compare(
				req.body.password,
				user.password
			);

			if (!isPasswordValid) {
				return res.status(401).json({ message: 'Mot de passe incorrect.' });
			}

			const token = jwt.sign({ userId: user.id }, privateKey, {
				expiresIn: '24h',
			});

			return res.json({
				message: "L'utilisateur a été connecté avec succès.",
				data: user,
				token,
			});
		} catch (error) {
			return res.status(500).json({
				message: "L'utilisateur n'a pas pu être connecté. Veuillez réessayer.",
				data: error.message,
			});
		}
	});
};
