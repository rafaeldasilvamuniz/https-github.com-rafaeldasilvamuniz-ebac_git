import { configureStore } from '@reduxjs/toolkit'

import carrinhoReducer from './carrinho'

import api from '../../services/api'

const store = configureStore({
  reducer: {
    carrinho: carrinhoReducer,
    [api.reducerPath]: api.reducer
  },
  middleware: (getDefaultMidddleware) =>
    getDefaultMidddleware().concat(api.middleware)
})

export type RootReducer = ReturnType<typeof store.getState>
