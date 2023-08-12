import { zones } from '../components/TableGDG/data';

const createPlayer = (name) => {
	const player = { name: name, zones: {} };

	for (let zone of zones) {
		player.zones[zone] = 0;
	}

	return player;
};

export default createPlayer;
