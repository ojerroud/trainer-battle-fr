const { Sequelize, DataTypes } = require('sequelize');
const PlayerModel = require('../models/player');
const UserModel = require('../models/user');
const players = require('./mock-player');
const bcrypt = require('bcrypt');

let sequelize;

const isProduction = process.env.NODE_ENV === 'production';

const { DB_PASSWORD, DB_USERNAME, DB_HOST, DB_NAME } = process.env;

if (isProduction) {
	sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
		host: DB_HOST,
		dialect: 'mariadb',
		dialectOptions: {
			timezone: 'Etc/GMT-2',
		},
		logging: false,
	});
} else {
	sequelize = new Sequelize('api_pokeland_legend_fr', 'root', '', {
		host: 'localhost',
		dialect: 'mariadb',
		dialectOptions: {
			timezone: 'Etc/GMT-2',
		},
		logging: false,
	});
}

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
		await sequelize.authenticate(); // Test de la connexion à la base de données

		// Synchronisation des modèles sans forcer la réinitialisation si les tables existent déjà
		await sequelize.sync();

		console.log('Connected to the database.');

		// Vérifier si les joueurs existent déjà
		const existingPlayers = await Player.findAll();
		if (existingPlayers.length === 0) {
			for (const player of players) {
				Player.create({
					name: player.name,
					zones: zonesDefaultValue,
					rewards: zonesDefaultValue,
				}).then((createdPlayer) => console.log(createdPlayer.toJSON()));
			}
		}

		// Vérifier si l'utilisateur existe déjà
		const existingUser = await User.findOne({ where: { username: 'user' } });
		if (!existingUser) {
			const hash = await bcrypt.hash('user', 10);
			User.create({
				username: 'user',
				password: hash,
			}).then((createdUser) => console.log(createdUser.toJSON()));
		}

		console.log('Database initialization complete.');
	} catch (error) {
		console.error('An error occurred during database initialization:', error);
	}
};

module.exports = { initDb, sequelize, Player, User };
