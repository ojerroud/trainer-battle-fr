import { initialData } from '../data/initialDatas';
import { tempCredentials } from '../data/tempCredential';
import { LOGIN_URL, FIND_ALL_PLAYERS_URL, UPDATE_PLAYER_URL } from './dataUrl';

export const getToken = async (username, password) => {
	try {
		return await fetch(LOGIN_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username, password }),
		}).then((res) => res.json());
	} catch (error) {
		console.error('Erreur lors de la récupération du token:', error.message);
	}
};

export const fetchPlayers = async () => {
	try {
		const { username, password } = tempCredentials;
		const { token, message } = await getToken(username, password);

		if (!token) throw new Error(message);

		const response = await fetch(FIND_ALL_PLAYERS_URL, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			// Si la réponse n'est pas "OK", lancez une erreur avec le statut de la réponse
			throw new Error(
				`Erreur lors de la récupération des données: ${response.status}`
			);
		}

		return await response.json();
	} catch (error) {
		console.error('Erreur lors de la récupération des données:', error.message);
		// Renvoie de données par défaut
		return { data: initialData };
	}
};

export const updatePlayerZone = async (id, zone) => {
	try {
		const { data, message } = await fetchPlayers();
		const playerToUpdate = data.find((e) => e.id === id);

		if (!playerToUpdate) {
			throw new Error(`Player with id ${id} not found.` + message);
		}

		if (!playerToUpdate.zones.hasOwnProperty(zone)) {
			throw new Error(
				`Zone ${zone} not found for player with id ${id}.` + message
			);
		}

		playerToUpdate.zones[zone] = playerToUpdate.zones[zone] === 0 ? 1 : 0;

		/** TODO put token on redux, so user is logged in or not */

		const { username, password } = tempCredentials;
		const { token, messageToken } = await getToken(username, password);

		if (!token) throw new Error(messageToken);

		return await fetch(UPDATE_PLAYER_URL(id), {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(playerToUpdate),
		}).then((res) => res.json());
	} catch (error) {
		console.error('Error updating player zone:', error);
	}
};

export const updatePlayerRewards = async ({ id, rewards }) => {
	try {
		const { data, message } = await fetchPlayers();
		const playerToUpdate = data.find((e) => e.id === +id);

		if (!playerToUpdate) {
			throw new Error(`Player with id ${id} not found.` + message);
		}

		playerToUpdate.rewards = rewards;

		/** TODO put token on redux, so user is logged in or not */
		const { username, password } = tempCredentials;
		const { token, messageToken } = await getToken(username, password);

		if (!token) throw new Error(messageToken);

		return await fetch(UPDATE_PLAYER_URL(id), {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(playerToUpdate),
		}).then((res) => res.json());
	} catch (error) {
		console.error('Error updating player zone:', error);
	}
};
