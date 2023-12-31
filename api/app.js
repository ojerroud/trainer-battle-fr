const express = require('express');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const sequelize = require('./src/db/sequelize');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

/** middlewares */

app
	.use(favicon(__dirname + '/favicon.ico'))
	.use(bodyParser.json())
	.use(cors());

sequelize.initDb();

/** routes */

require('./src/routes/findAllPlayers')(app);
require('./src/routes/findPlayerByPk')(app);
require('./src/routes/createPlayer')(app);
require('./src/routes/updatePlayer')(app);
require('./src/routes/deletePlayer')(app);
require('./src/routes/login')(app);

app.use('/', (req, res) => res.json({ message: 'hello heroku !' }));

/** gestion des pages not found */

app.use(({ res }) => {
	const message =
		'impossible de trouver la ressource demandée. Vous pouvez essayer une autre URL';
	res.status(404).json({ message });
});

app.listen(PORT, () =>
	console.log(`l'api est démarrer sur : http://localhost:${PORT}`)
);
