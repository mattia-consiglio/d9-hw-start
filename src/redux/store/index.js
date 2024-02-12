import { configureStore } from '@reduxjs/toolkit'
import favouritesReducer from '../reducers'

const store = configureStore({
	reducer: favouritesReducer,
})

export default store
