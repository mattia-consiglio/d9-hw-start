import { SET_SEARCH_QUERY, SET_SEARCH_RESULTS } from '../actions'

const initialState = {
	query: '',
	results: [],
	isLoading: false,
	error: '',
}
const searchReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_SEARCH_QUERY:
			return {
				...state,
				query: action.payload,
			}
		case SET_SEARCH_RESULTS:
			return {
				...state,
				results: action.payload,
			}
		case 'SET_SEARCH_LOADING':
			return {
				...state,
				isLoading: action.payload,
			}
		case 'SET_SEARCH_ERROR':
			return {
				...state,
				error: action.payload,
			}
		default:
			return state
	}
}

export default searchReducer
