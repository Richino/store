"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Checkout {
	id: number;
	quantity: number;
}

const initialState: Checkout[] = [];

export const checkoutSlice = createSlice({
	name: "checkout",
	initialState,
	reducers: {
		inititateCheckout: (state, action: any) => {
			return action.payload;
		},
		addToCheckout: (state, action: PayloadAction<number>) => {
			const index = state.findIndex((item) => item.id === action.payload);
			if (index >= 0) {
				if (state[index].quantity >= 10) return;
				state[index].quantity += 1;
				localStorage.setItem("checkout", JSON.stringify(state));
			} else {
				const item = {
					id: action.payload,
					quantity: 1,
				};
				state.push(item);
				localStorage.setItem("checkout", JSON.stringify(state));
			}
		},
		removeFromCheckout: (state, action: PayloadAction<number>) => {
			const index = state.findIndex((item) => item.id === action.payload);
			if (index >= 0) {
				state.splice(index, 1);
				localStorage.setItem("checkout", JSON.stringify(state));
			}
		},
		updateQuantity: (state, action: PayloadAction<any>) => {
			const index = state.findIndex((item) => item.id === action.payload.id);
			if (index >= 0) {
				state[index].quantity = action.payload.quantity; 
				localStorage.setItem("checkout", JSON.stringify(state));
			}
		},
	},
});

export const { addToCheckout, removeFromCheckout, updateQuantity, inititateCheckout } = checkoutSlice.actions;
export default checkoutSlice.reducer;
