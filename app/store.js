import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'

import userReducer from 'app/slices/user.slice'
import cartReducer from 'app/slices/cart.slice'
import fitlerReducer from 'app/slices/filter.slice'
import alertReducer from 'app/slices/alert.slice'
import apiSlice from 'app/api/api'

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    filter: fitlerReducer,
    alert: alertReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (gDM) => gDM().concat(apiSlice.middleware),
})

// enable listener behavior for the store
setupListeners(store.dispatch)
