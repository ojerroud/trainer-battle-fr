import { createSlice } from '@reduxjs/toolkit';

const initialZones = [
	'NEILOPOLIS',
	'HEDAK',
	'VALLEE ARC',
	'FORET BRUMEUSE',
	'COTE ENSOLEILLEE',
	'VOLCAN GRONDANT',
	'CANYON DU TONNERRE',
	'DESERT SENENITE',
	'PLAINES ETOILEES',
	'VALLEE CDL',
	'MONTAGNE ENNEIGEE',
	"ILE D'AUBEVILLE",
	'PLATEAU DESTINEE',
	'MARECAGE OUBLIE',
	'LAC CRISTAL',
	'TUMULUS DU DRAGON',
];

const players = ['Flowax', 'Biggie', 'Bamlet'];

const initialPlayers = players.map((name, index) => ({
	id: index + 1,
	name,
	zones: Object.fromEntries(initialZones.map((zone) => [zone, 0])),
}));

export const playerSLice = createSlice({
	name: 'player',
	initialState: initialPlayers,
	reducers: {
		addPlayer: (state, action) => {
			state.push({
				id: Date.now(),
				name: action.payload,
				zones: Object.fromEntries(initialZones.map((zone) => [zone, 0])),
			});
		},
		modifyPlayerName: (state, action) => {
			// playload: (id: INTEGER, name: STRING)
			const player = state.find((elem) => elem.id === action.payload.id);
			if (player) player.name = action.payload.name;
		},
		toggleZone: (state, action) => {
			// payload: {id: INTEGER, zone: STRING}
			const { id, zone } = action.payload;
			const player = state.find((elem) => elem.id === id);
			if (player) player.zones[zone] = player.zones[zone] === 0 ? 1 : 0;
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

// export const { addPlayer, toggleZone } = playerSLice.actions;

// export const store = configureStore({
// 	reducer: {
// 		player: playerSLice.reducer,
// 		zone: zoneSlice.reducer,
// 	},
// });
