const initialState = {
	favourites: {
		items: [],
	},
	search: {
		query: '',
	},
}
const indexReducer = (state = initialState, action) => {
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
		case 'SET_SEARCH_QUERY':
			return {
				...state,
				search: {
					...state.search,
					query: action.payload,
				},
			}
		default:
			return state
	}
}

export default indexReducer
