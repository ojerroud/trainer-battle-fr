const express = require('express');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./src/db/sequelize');
const corsOptions = require('./src/config/corsConfig');

const app = express();
const port = 3000;

/** middlewares */

app
	.use(favicon(__dirname + '/favicon.ico'))
	.use(morgan('dev'))
	.use(cors(corsOptions))
	.use(bodyParser.json());

sequelize.initDb();

/** routes */

require('./src/routes/findAllPlayers')(app);
require('./src/routes/findPlayerByPk')(app);
require('./src/routes/createPlayer')(app);
require('./src/routes/updatePlayer')(app);
require('./src/routes/deletePlayer')(app);
require('./src/routes/login')(app);

/** gestion des pages not found */

app.use(({ res }) => {
	const message =
		'impossible de trouver la ressource demandée. Vous pouvez essayer une autre URL';
	res.status(404).json({ message });
});

app.listen(port, () =>
	console.log(`l'api est démarrer sur : http://localhost:${port}`)
);
