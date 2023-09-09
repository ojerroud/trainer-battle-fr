import { createSlice } from '@reduxjs/toolkit';
import {
	fetchPlayers,
	updatePlayerReward,
	updatePlayerZones,
} from '../api/api';
import { initialZones } from '../data/initialDatas';

const { data } = await fetchPlayers();

export const playerSLice = createSlice({
	name: 'player',
	initialState: data,
	reducers: {
		addPlayer: (state, action) => {
			state.push({
				id: Date.now(),
				name: action.payload,
				zones: Object.fromEntries(initialZones.map((zone) => [zone, 0])),
			});
		},
		updateZonesValues: (state, action) => {
			const playersList = action.payload;

			for (const player of state) {
				const currPlayer = playersList.find(
					(playersList) => +playersList.id === +player.id
				);

				if (currPlayer) {
					const currPlayerZonesJSON = JSON.stringify(currPlayer.zones);
					const playerZonesJSON = JSON.stringify(player.zones);

					if (currPlayerZonesJSON !== playerZonesJSON) {
						player.zones = currPlayer.zones;
						updatePlayerZones({
							id: player.id,
							zones: { ...player.zones },
						});
					}
				}
			}
		},
		toggleRewards: (state, action) => {
			// payload: {id: INTEGER, zone: STRING}
			const { id, zone } = action.payload;
			const player = state.find((elem) => elem.id === id);
			if (player) player.rewards[zone] = player.rewards[zone] === 0 ? 1 : 0;
			updatePlayerReward(id, zone);
		},
		deletePlayer: (state, action) => {
			return state.filter((elem) => elem.id !== action.payload);
		},
	},
});

export const zoneSlice = createSlice({
	name: 'zone',
	initialState: initialZones,
});
