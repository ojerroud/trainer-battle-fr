import { configureStore } from '@reduxjs/toolkit';
import { playerSLice, zoneSlice } from '../redux';

export const store = configureStore({
	reducer: {
		player: playerSLice.reducer,
		zone: zoneSlice.reducer,
	},
});
