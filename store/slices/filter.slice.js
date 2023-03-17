import { createSlice } from '@reduxjs/toolkit'
import { sorts } from 'utils/constatns'

const initialState = {
  sort: sorts[0],
  inStock: false,
  discount: false,
  max_price: 0,
  min_price: 0,
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    updateFilter: (state, action) => {
      state[action.payload.name] = action.payload.value
    },
    resetFilter: (state, action) => {
      state.inStock = false
      state.discount = false
      state.sort = sorts[0]
      state.max_price = action.payload.maxPrice
      state.min_price = action.payload.minPrice
    },
    loadFilters: (state, action) => {
      const { sort, discount, inStock, price } = action.payload
      if (sort) state.sort = sorts[sort - 1]
      if (discount) {
        if (discount === 'true') state.discount = true
        if (discount === 'false') state.discount = false
      }
      if (inStock) {
        if (inStock === 'true') state.inStock = true
        if (inStock === 'false') state.inStock = false
      }
      if (price) {
        const splitPrice = price.split('-')
        state.min_price = +splitPrice[0]
        state.max_price = +splitPrice[1]
      }
    },
  },
})

export const { updateFilter, resetFilter, loadFilters } = filterSlice.actions

export default filterSlice.reducer
