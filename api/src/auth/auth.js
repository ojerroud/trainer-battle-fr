const jwt = require('jsonwebtoken');
const privateKey = require('./private_key');

module.exports = (req, res, next) => {
	const authorizeationHeader = req.headers.authorization;

	if (!authorizeationHeader) {
		const message =
			"Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en dans l'en-tête de la requête.";
		return res.status(401).json({ message });
	}

	const token = authorizeationHeader.split(' ')[1];
	const decodedToken = jwt.verify(token, privateKey, (error, decodedToken) => {
		if (error) {
			const message = "Vous n'avez pas le droit d'acceder à cette ressource.";
			return res.status(401).json({ message, data: error });
		}

		const userId = decodedToken.userId;
		if (req.body.userId && req.body.userId != userId) {
			const message = "L'identifiant de l'utilisateur est invalide.";
			res.status(401).json({ message });
		} else {
			next();
		}
	});
};
