import { ADD_FAVOURITE, REMOVE_FAVOURITE } from '../actions'

const initialState = {
	items: [],
}
const favouritesReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_FAVOURITE:
			return {
				...state,
				items: [...state.items, action.payload],
			}
		case REMOVE_FAVOURITE:
			return {
				...state,
				items: state.items.filter(item => item !== action.payload),
			}
		default:
			return state
	}
}

export default favouritesReducer
