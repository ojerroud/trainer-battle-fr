const { Sequelize, DataTypes } = require('sequelize');
const PlayerModel = require('../models/player');
const UserModel = require('../models/user');
const players = require('./mock-player');
const bcrypt = require('bcrypt');

const sequelize = new Sequelize('api_pokeland_legend_fr', 'root', '', {
	host: 'localhost',
	dialect: 'mariadb',
	dialectOptions: {
		timezone: 'Etc/GMT-2',
	},
	logging: true,
});

const Player = PlayerModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);

const zonesDefaultValue = {
	NEILOPOLIS: 0,
	HEDAK: 0,
	'VALLEE ARC': 0,
	'FORET BRUMEUSE': 0,
	'COTE ENSOLEILLEE': 0,
	'VOLCAN GRONDANT': 0,
	'CANYON DU TONNERRE': 0,
	'DESERT SENENITE': 0,
	'PLAINES ETOILEES': 0,
	'VALLEE CDL': 0,
	'MONTAGNE ENNEIGEE': 0,
	"ILE D'AUBEVILLE": 0,
	'PLATEAU DESTINEE': 0,
	'MARECAGE OUBLIE': 0,
	'LAC CRISTAL': 0,
	'TUMULUS DU DRAGON': 0,
};

const initDb = async () => {
	try {
		await sequelize.sync({ force: true });

		/** initialize players data */

		for (const player of players) {
			const createdPlayer = await Player.create({
				name: player.name,
				zones: zonesDefaultValue,
			});

			console.log(createdPlayer.toJSON());
		}

		/** initialize users data */
		/** using bcrypt to encrypt password */

		bcrypt.hash('user', 10).then(async (hash) => {
			const createdUser = await User.create({
				username: 'user',
				password: hash,
			});

			console.log(createdUser.toJSON());
		});

		console.log('La base de données a bien été initialisée.');
	} catch (error) {
		console.error(
			"Une erreur est survenue lors de l'initialisation de la base de données:",
			error
		);
	}
};

module.exports = { initDb, sequelize, Player, User };
