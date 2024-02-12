const initialState = {
	favourites: {
		items: [],
	},
}
const favouritesReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'ADD_FAVOURITE':
			return {
				...state,
				favourites: {
					...state.favourites,
					items: [...state.favourites.items, action.payload],
				},
			}
		case 'REMOVE_FAVOURITE':
			return {
				...state,
				favourites: {
					...state.favourites,
					items: state.favourites.items.filter(item => item !== action.payload),
				},
			}
		default:
			return state
	}
}

export default favouritesReducer
