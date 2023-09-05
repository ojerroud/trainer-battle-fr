import { createSlice } from '@reduxjs/toolkit';
import {
	fetchPlayers,
	updatePlayerZone,
	updatePlayerRewards,
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
		updateRewardsValues: (state, action) => {
			const playersList = action.payload;

			for (const player of state) {
				const currPlayer = playersList.find(
					(playersList) => +playersList.id === +player.id
				);

				if (currPlayer) {
					const currPlayerRewardsJSON = JSON.stringify(currPlayer.rewards);
					const playerRewardsJSON = JSON.stringify(player.rewards);

					if (currPlayerRewardsJSON !== playerRewardsJSON) {
						player.rewards = currPlayer.rewards;
						updatePlayerRewards({
							id: player.id,
							rewards: { ...player.rewards },
						});
					}
				}
			}
		},
		toggleZone: (state, action) => {
			// payload: {id: INTEGER, zone: STRING}
			const { id, zone } = action.payload;
			const player = state.find((elem) => elem.id === id);
			if (player) player.zones[zone] = player.zones[zone] === 0 ? 1 : 0;
			updatePlayerZone(id, zone);
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
