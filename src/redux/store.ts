import { configureStore } from "@reduxjs/toolkit";
import nav from "./navr-reducer";
export const store = configureStore({
	reducer: {
		nav,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
