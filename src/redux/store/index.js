import { configureStore } from '@reduxjs/toolkit'
import indexReducer from '../reducers'

const store = configureStore({
	reducer: indexReducer,
})

export default store
