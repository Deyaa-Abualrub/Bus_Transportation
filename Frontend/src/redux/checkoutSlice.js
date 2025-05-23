import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    user_id: null, 
    username: "",
  },
  bus: {
    busRoute: "",
    busNumber: "",
    price: "",
    seatAvailable: "",
  },
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user.user_id = action.payload.user_id; 
      state.user.username = action.payload.username;
    },
    setBusDetails: (state, action) => {
      state.bus.busRoute = action.payload.busRoute;
      state.bus.busNumber = action.payload.busNumber;
      state.bus.price = action.payload.price;
      state.bus.seatAvailable = action.payload.seatAvailable;
    },
  },
});

export const { setUser, setBusDetails } = checkoutSlice.actions;
export default checkoutSlice.reducer;
