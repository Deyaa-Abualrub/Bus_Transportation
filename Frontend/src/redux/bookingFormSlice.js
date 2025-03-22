import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  from: "",
  to: "",
  searchType: "",
};

const bookingFormSlice = createSlice({
  name: "bookingForm",
  initialState,
  reducers: {
    setBookingForm: (state, action) => {
      state.from = action.payload.from;
      state.to = action.payload.to;
      state.searchType = action.payload.searchType;
    },
  },
});

export const { setBookingForm } = bookingFormSlice.actions;
export default bookingFormSlice.reducer;
