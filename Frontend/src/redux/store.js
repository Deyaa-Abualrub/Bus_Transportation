// redux/store.js
import { configureStore } from '@reduxjs/toolkit'
import bookingFormReducer from './bookingFormSlice'


const Store = configureStore({
  reducer: {
    bookingForm: bookingFormReducer,

  }
})

export default Store ;