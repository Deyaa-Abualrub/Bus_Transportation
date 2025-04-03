// redux/store.js
import { configureStore } from '@reduxjs/toolkit'
import bookingFormReducer from './bookingFormSlice'
import checkoutReducer from './checkoutSlice'


const Store = configureStore({
  reducer: {
    bookingForm: bookingFormReducer,
    checkout: checkoutReducer,

  }
})

export default Store ;