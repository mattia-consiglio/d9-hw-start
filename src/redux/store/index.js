import { configureStore, combineReducers } from '@reduxjs/toolkit'
import favouritesReducer from '../reducers/favourites'
import searchReducer from '../reducers/search'

const rootStore = combineReducers({
	favourites: favouritesReducer,
	search: searchReducer,
})

const store = configureStore({
	reducer: rootStore,
})

export default store
